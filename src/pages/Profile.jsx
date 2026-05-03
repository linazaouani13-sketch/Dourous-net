import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Calendar, ShieldCheck, Edit3 } from 'lucide-react';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.first_name || user?.user_metadata?.full_name?.split(' ')[0] || 'Student',
    lastName: user?.user_metadata?.last_name || '',
    phone: user?.user_metadata?.phone || '+1 234 567 8900',
    bio: 'Passionate learner eager to improve my skills.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const displayName = `${profileData.firstName} ${profileData.lastName}`.trim();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-surface)' }}>
      <div className="container-max" style={{ paddingTop: '100px', paddingBottom: '60px', flex: 1, maxWidth: '800px' }}>

        {/* Profile Header Card */}
        <div className="card-static animate-fade-in-up" style={{ padding: '32px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
          {/* Gradient banner */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
            background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400))',
            opacity: 0.1,
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1, marginTop: '32px' }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: 'var(--radius-xl)',
                border: '3px solid var(--color-surface-container-lowest)',
                overflow: 'hidden', backgroundColor: 'var(--color-primary-50)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
              }}>
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${displayName}&backgroundColor=f2f3fd&textColor=424754`}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <button style={{
                position: 'absolute', bottom: '-4px', right: '-4px',
                width: '28px', height: '28px', borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-600)', color: '#fff',
                border: '2px solid var(--color-surface-container-lowest)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}>
                <Edit3 size={12} />
              </button>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)' }}>{displayName}</h1>
                <span className="tag tag-secondary" style={{ fontSize: '10px' }}>
                  <ShieldCheck size={12} style={{ marginRight: '4px' }} /> Active
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} /> {user?.email}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-outline)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Calendar size={14} /> Joined recently
              </p>
            </div>

            <button onClick={() => setIsEditing(!isEditing)} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '13px' }}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="card-static animate-fade-in-up delay-100" style={{ padding: '32px' }}>
          <h2 style={{
            fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)',
            marginBottom: '24px', paddingBottom: '16px',
            borderBottom: '1px solid var(--color-outline-variant)',
          }}>
            Personal Information
          </h2>

          {isEditing ? (
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>First Name</label>
                  <input type="text" className="input-field" value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })} />
                </div>
                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Last Name</label>
                  <input type="text" className="input-field" value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })} />
                </div>
                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Phone</label>
                  <input type="tel" className="input-field" value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Bio</label>
                  <textarea className="input-field" rows={3} style={{ resize: 'none', fontFamily: 'var(--font-body)' }}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--color-outline-variant)' }}>
                <button type="submit" className="btn-primary" style={{ padding: '12px 32px' }}>Save Changes</button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <p className="label-caps" style={{ marginBottom: '6px', color: 'var(--color-outline)' }}>Full Name</p>
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-on-surface)' }}>{displayName}</p>
              </div>
              <div>
                <p className="label-caps" style={{ marginBottom: '6px', color: 'var(--color-outline)' }}>Email Address</p>
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-on-surface)' }}>{user?.email}</p>
              </div>
              <div>
                <p className="label-caps" style={{ marginBottom: '6px', color: 'var(--color-outline)' }}>Phone Number</p>
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} style={{ color: 'var(--color-outline)' }} /> {profileData.phone}
                </p>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <p className="label-caps" style={{ marginBottom: '6px', color: 'var(--color-outline)' }}>Bio</p>
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-on-surface)', lineHeight: 1.6 }}>{profileData.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
