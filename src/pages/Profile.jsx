import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Calendar, ShieldCheck, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Dummy profile state for demonstration
  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.first_name || 'Student',
    lastName: user?.user_metadata?.last_name || '',
    phone: user?.user_metadata?.phone || '+1 234 567 8900',
    bio: 'Passionate learner eager to improve my skills.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header Section */}
        <div className="card-premium p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary-600 to-primary-400 opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mt-12">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl border-4 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.nom || 'User'}&backgroundColor=f1f5f9&textColor=64748b`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors">
                <Edit3 size={16} />
              </button>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <span className="px-3 py-1 bg-success-100 text-success-700 text-xs font-bold rounded-full flex items-center gap-1">
                  <ShieldCheck size={14} /> Active
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Mail size={16} /> {user?.email}
              </p>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Calendar size={16} /> Joined recently
              </p>
            </div>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary px-6 py-2"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="card-premium p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            Personal Information
          </h2>
          
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">First Name</label>
                  <input 
                    type="text" 
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Phone</label>
                  <input 
                    type="tel" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Bio</label>
                  <textarea 
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                <button type="submit" className="btn-primary px-8 py-3">Save Changes</button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</h3>
                  <p className="text-gray-900 dark:text-white font-medium">{profileData.firstName} {profileData.lastName || ''}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</h3>
                  <p className="text-gray-900 dark:text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</h3>
                  <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" /> {profileData.phone}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Bio</h3>
                  <p className="text-gray-900 dark:text-white font-medium">{profileData.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
