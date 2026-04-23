import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { X, Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingModal = ({ teacher, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [dateHeure, setDateHeure] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateHeure || !file) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload PDF
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('devoirs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('devoirs')
        .getPublicUrl(filePath);

      // 3. Insert into seances
      const { error: seanceError } = await supabase
        .from('seances')
        .insert({
          eleve_id: user.id,
          professeur_id: teacher.id,
          date_heure: dateHeure,
          devoir_url: publicUrl,
          statut: 'reservee',
          commentaire: commentaire
        });

      if (seanceError) throw seanceError;

      toast.success('Séance réservée et devoir téléchargé !');
      onSuccess();
    } catch (err) {
      toast.error(`Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1f1f1f] rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-gray-800">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e5e5e5]">Réserver une séance</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Professeur</label>
            <input
              type="text"
              value={teacher.nom}
              readOnly
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Date et heure *</label>
            <input
              type="datetime-local"
              required
              value={dateHeure}
              onChange={(e) => setDateHeure(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-[#e5e5e5] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Télécharger le devoir (PDF) *</label>
            <div className="relative group">
              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-full px-4 py-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-3 transition-all ${file ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                <Upload size={20} className={file ? 'text-primary-600' : 'text-gray-400'} />
                <span className="text-sm font-medium">
                  {file ? file.name : "Cliquez pour choisir un PDF"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Commentaire (Optionnel)</label>
            <textarea
              rows="3"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-[#e5e5e5] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
              placeholder="Des précisions pour le professeur ?"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-900/50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-200 dark:shadow-none active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Réservation en cours...
                </>
              ) : (
                'Confirmer la réservation'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
