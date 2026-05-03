import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { X, Loader2, FileText, Star, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingModal = ({ teacher, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [commentaire, setCommentaire] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const dateSlots = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate(),
      time: ['10:00 AM', '02:30 PM', '11:00 AM'][i],
      fullDate: d.toISOString().split('T')[0],
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please upload your homework PDF.');
      return;
    }

    setLoading(true);
    try {
      const timestamp = Date.now();
      const sanitizedName = file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const fileName = `${timestamp}_${sanitizedName}`;
      const filePath = `${user.id}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('devoirs').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('devoirs').getPublicUrl(filePath);

      const slot = dateSlots[selectedSlotIndex];
      const timePart = slot.time.split(' ')[0];
      const isPM = slot.time.includes('PM');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (isPM && hours !== 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;
      const dateTimeStr = `${slot.fullDate} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;

      const { error: profileError } = await supabase.from('eleves').upsert({
        id: user.id,
        nom: user.user_metadata?.full_name || user.email.split('@')[0],
        email: user.email
      }, { onConflict: 'id' });

      if (profileError) {
        console.error("Profile Upsert Error:", profileError);
      }

      const { error: insertError } = await supabase.from('seances').insert({
        eleve_id: user.id,
        professeur_id: teacher.id,
        date_heure: dateTimeStr,
        devoir_url: publicUrl,
        commentaire: commentaire,
        statut: 'reservee',
      });
      if (insertError) throw insertError;

      toast.success('Session booked successfully!');
      onSuccess();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-overlay animate-fade-in">
      <div
        className="animate-scale-in"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          width: '100%',
          maxWidth: '520px',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--color-outline-variant)',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 24px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              marginBottom: '4px',
            }}>
              Book Your Session
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Complete the details below to finalize your lesson.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-outline)',
              transition: 'background 0.2s',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="custom-scrollbar" style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px 24px',
        }}>
          {/* Teacher Profile Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-outline-variant)',
            backgroundColor: 'var(--color-surface-container-low)',
            marginBottom: '24px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              flexShrink: 0,
              border: '2px solid var(--color-outline-variant)',
            }}>
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.nom}&backgroundColor=f2f3fd&textColor=424754`}
                alt={teacher.nom}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '2px' }}>
                {teacher.nom}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-primary-600)', fontWeight: 500 }}>
                {teacher.specialite} Specialist
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-on-surface-variant)' }}>
              <Star size={14} style={{ color: 'var(--color-primary-600)' }} />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>4.9</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Date & Time Selection */}
            <div style={{ marginBottom: '24px' }}>
              <label className="label-caps" style={{ display: 'block', marginBottom: '12px' }}>
                SELECT DATE & TIME
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {dateSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedSlotIndex(i)}
                    style={{
                      padding: '14px 8px',
                      borderRadius: 'var(--radius-xl)',
                      border: selectedSlotIndex === i
                        ? '2px solid var(--color-primary-600)'
                        : '1px solid var(--color-outline-variant)',
                      backgroundColor: selectedSlotIndex === i
                        ? 'var(--color-primary-50)'
                        : 'var(--color-surface-container-lowest)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <p style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: selectedSlotIndex === i ? 'var(--color-primary-600)' : 'var(--color-on-surface)',
                      marginBottom: '4px',
                    }}>
                      {slot.label}, {slot.day}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: selectedSlotIndex === i ? 'var(--color-primary-600)' : 'var(--color-outline)',
                    }}>
                      {slot.time}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* PDF Upload */}
            <div style={{ marginBottom: '24px' }}>
              <label className="label-caps" style={{ display: 'block', marginBottom: '12px' }}>
                UPLOAD HOMEWORK (PDF)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                />
                <div style={{
                  padding: '32px 20px',
                  border: `2px dashed ${file ? 'var(--color-primary-600)' : 'var(--color-outline-variant)'}`,
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: file ? 'var(--color-primary-50)' : 'var(--color-surface-container-low)',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-surface-container-lowest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    color: 'var(--color-primary-600)',
                    border: '1px solid var(--color-outline-variant)',
                  }}>
                    <FileText size={20} />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-on-surface)',
                    marginBottom: '4px',
                  }}>
                    {file ? file.name : 'Drag and drop your PDF here'}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
                    or click to browse from your computer
                  </p>
                  {!file && (
                    <span className="tag" style={{
                      backgroundColor: 'var(--color-surface-container)',
                      color: 'var(--color-outline)',
                      marginTop: '12px',
                      fontSize: '9px',
                    }}>
                      MAX 10MB
                    </span>
                  )}
                  {file && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      marginTop: '8px',
                      color: 'var(--color-secondary-600)',
                    }}>
                      <CheckCircle2 size={14} />
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>File selected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comment / Note */}
            <div style={{ marginBottom: '24px' }}>
              <label className="label-caps" style={{ display: 'block', marginBottom: '12px' }}>
                ADD A NOTE FOR THE TEACHER
              </label>
              <textarea
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                placeholder={`Tell ${teacher.nom} what topics you'd like to focus on today...`}
                rows="3"
                className="input-field"
                style={{
                  resize: 'none',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                }}
              />
            </div>

            {/* Footer: Price + Actions */}
            <div style={{
              paddingTop: '20px',
              borderTop: '1px solid var(--color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <p className="label-caps" style={{ marginBottom: '4px', fontSize: '10px', color: 'var(--color-outline)' }}>
                  TOTAL ESTIMATE
                </p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                }}>
                  ${teacher.tarif_horaire || 45}.00
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '12px 20px',
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-on-surface-variant)',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  {loading ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
