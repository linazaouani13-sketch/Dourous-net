import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { X, Upload, Loader2, Calendar as CalendarIcon, FileText, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingModal = ({ teacher, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('2024-12-01');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !file) {
      toast.error('Please select a time slot and upload your homework.');
      return;
    }

    setLoading(true);
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
      const filePath = `${user.id}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('devoirs').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('devoirs').getPublicUrl(filePath);

      const dateTimeStr = `${selectedDate} ${selectedSlot.split(' ')[0]}:00`;
      
      const { error: insertError } = await supabase.from('seances').insert({
        eleve_id: user.id,
        professeur_id: teacher.id,
        date_heure: dateTimeStr,
        devoir_url: publicUrl,
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
    <div className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[200] animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border border-white dark:border-gray-800">
        
        {/* Header */}
        <div className="p-8 pb-4 flex items-start justify-between border-b border-gray-50 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Book Your Session</h2>
            <p className="text-sm text-gray-500 font-medium">Schedule a lesson with Prof. {teacher.nom}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all text-gray-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[80vh] custom-scrollbar">
          {/* Profile Summary */}
          <div className="bg-primary-50/50 dark:bg-primary-900/10 p-5 rounded-3xl flex items-center gap-5 mb-8 border border-primary-100/50 dark:border-primary-800/30">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.nom}&backgroundColor=f1f5f9&textColor=64748b`} className="w-16 h-16 rounded-2xl object-cover bg-white" alt={teacher.nom} />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">{teacher.specialite} Specialist</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-primary-600 font-bold text-sm">
                   <Star size={14} className="fill-current mr-1" />
                   <span>4.9 (128 Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection Placeholder */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Date</label>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                   {/* Simple Calendar Placeholder to match UI */}
                   <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-sm">December 2024</span>
                      <div className="flex gap-2">
                        <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">{'<'}</button>
                        <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">{'>'}</button>
                      </div>
                   </div>
                   <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-400 mb-2">
                      <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                   </div>
                   <div className="grid grid-cols-7 gap-2 text-center">
                      {[25,26,27,28,29,30,1].map((d, i) => (
                        <button 
                          key={i} 
                          type="button" 
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${d === 1 ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                          {d < 10 ? `0${d}` : d}
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Time Slot</label>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedSlot === slot 
                          ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30' 
                          : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white hover:border-primary-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {selectedSlot && (
                  <div className="flex items-center gap-2 text-success-600 text-[10px] font-bold mt-2">
                    <CheckCircle2 size={14} />
                    Slot available for booking
                  </div>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Upload Homework / Syllabus (PDF)</label>
              <div className="relative group">
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`w-full py-10 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all ${file ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-500' : 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800 group-hover:border-primary-500'}`}>
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm">
                    <FileText className="text-primary-600" size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{file ? file.name : "Drag and drop your PDF here"}</p>
                    <p className="text-xs text-gray-500 mt-1">or click to browse from your computer (Max 10MB)</p>
                  </div>
                </div>
              </div>
              {file && (
                 <div className="bg-success-50 dark:bg-success-900/10 p-3 rounded-xl flex items-center justify-between border border-success-100 dark:border-success-800/30">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-success-600" />
                      <span className="text-xs font-bold text-success-700 dark:text-success-400 truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <button type="button" onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <X size={16} />
                    </button>
                 </div>
              )}
            </div>

            {/* Footer / Summary */}
            <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Estimate</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">$45.00</span>
                  <span className="text-gray-500 text-sm">/ session</span>
                </div>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 md:flex-none px-8 py-4 font-bold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 md:flex-none btn-primary px-10 py-4 shadow-xl shadow-primary-500/20"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Booking"}
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
