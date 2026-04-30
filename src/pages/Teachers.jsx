import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import TeacherCard from '../components/TeacherCard';
import BookingModal from '../components/BookingModal';
import { Search, Filter, Loader2, Star } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Expert Educators</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Connect with world-class teachers specializing in various subjects to accelerate your learning journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl font-bold text-sm">
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTeachers.map(teacher => (
          <TeacherCard 
            key={teacher.id} 
            teacher={teacher} 
            onBook={() => setSelectedTeacher(teacher)} 
          />
        ))}
      </div>

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
