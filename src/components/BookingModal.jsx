import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { X, Upload, Loader2, Calendar, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingModal = ({ teacher, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [dateHeure, setDateHeure] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation
    if (!dateHeure || !file) {
      toast.error('Veuillez remplir les champs obligatoires.');
      return;
    }

    const selectedDate = new Date(dateHeure);
    if (selectedDate <= new Date()) {
      toast.error('La date doit être dans le futur.');
      return;
    }

    setLoading(true);

    try {
      // 2. Upload PDF to Storage
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('devoirs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('devoirs')
        .getPublicUrl(filePath);

      // 4. Insert Seance Record
      const { error: insertError } = await supabase
        .from('seances')
        .insert({
          eleve_id: user.id,
          professeur_id: teacher.id,
          date_heure: dateHeure,
          devoir_url: publicUrl,
          statut: 'reservee',
          commentaire: commentaire
        });

      if (insertError) throw insertError;

      toast.success('Séance réservée avec succès !');
      onSuccess();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1f1f1f] rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-[#e5e5e5]">Réserver une séance</h2>
            <p className="text-sm text-gray-500 font-medium">Avec Prof. {teacher.nom}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded-2xl transition-all active:scale-90 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Date Picker */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
              <Calendar size={16} className="text-primary-600" />
              Date et heure de la séance *
            </label>
            <input
              type="datetime-local"
              required
              value={dateHeure}
              onChange={(e) => setDateHeure(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-[#e5e5e5] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-medium"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
              <Upload size={16} className="text-primary-600" />
              Déposer votre devoir (PDF uniquement) *
            </label>
            <div className="relative group">
              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-full px-4 py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all ${file ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400' : 'border-gray-200 dark:border-gray-700 group-hover:border-primary-400 group-hover:bg-gray-50 dark:group-hover:bg-[#2d2d2d]'}`}>
                {file ? <FileText size={40} /> : <Upload size={40} className="text-gray-300 group-hover:text-primary-500 transition-colors" />}
                <span className="text-sm font-bold text-center">
                  {file ? file.name : "Cliquez ou glissez votre fichier ici"}
                </span>
                {file && <span className="text-[10px] uppercase font-bold text-primary-600">Fichier prêt</span>}
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Commentaire (optionnel)</label>
            <textarea
              rows="3"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-[#e5e5e5] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-medium resize-none"
              placeholder="Des précisions pour le professeur ?"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-primary-600 text-white rounded-[1.5rem] font-bold text-lg hover:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-900/50 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-2xl shadow-primary-200 dark:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Finalisation de la réservation...
              </>
            ) : (
              'Confirmer la réservation'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
