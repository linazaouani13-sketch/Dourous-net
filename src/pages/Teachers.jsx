import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import TeacherCard from '../components/TeacherCard';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';
import { Search, Filter, Loader2 } from 'lucide-react';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await supabase.from('professeurs').select('*');
      setTeachers(data || []);
      setLoading(false);
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(t =>
    t.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.specialite.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--color-outline-variant)', borderTopColor: 'var(--color-primary-600)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-surface)' }}>
      <div className="container-max" style={{ paddingTop: '100px', paddingBottom: '60px', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-on-surface)', marginBottom: '12px' }}>
            Our Expert Educators
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-on-surface-variant)', maxWidth: '520px', margin: '0 auto' }}>
            Connect with world-class teachers specializing in various subjects to accelerate your learning journey.
          </p>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
            <input
              type="text"
              placeholder="Search by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '44px', borderRadius: 'var(--radius-full)' }}
            />
          </div>
          <button className="btn-secondary" style={{ gap: '8px' }}>
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredTeachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onBook={() => setSelectedTeacher(teacher)}
            />
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '16px', color: 'var(--color-outline)' }}>No teachers found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />

      {selectedTeacher && (
        <BookingModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          onSuccess={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
};

export default Teachers;
