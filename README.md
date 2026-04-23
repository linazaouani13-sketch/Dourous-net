# Dourous-Net - Plateforme d'éducation

Dourous-Net est une application web moderne permettant aux étudiants de réserver des séances de soutien scolaire avec des professeurs qualifiés.

## Fonctionnalités

- **Authentification sécurisée** : Inscription et connexion via Supabase Auth.
- **Liste des professeurs** : Consultez les profils des professeurs, leurs spécialités et tarifs.
- **Réservation de séances** : Choisissez une date, une heure et téléchargez vos devoirs (PDF).
- **Suivi des séances** : Visualisez vos séances à venir et accédez à vos documents déposés.

## Technologies utilisées

- **Frontend** : React + Vite
- **Styling** : Tailwind CSS
- **Backend** : Supabase (Database, Auth, Storage)
- **Icons** : Lucide-React
- **Date management** : date-fns

## Installation locale

1. Clonez le dépôt.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement dans un fichier `.env` :
   ```env
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
   ```
4. Lancez l'application en mode développement :
   ```bash
   npm run dev
   ```

## Configuration Supabase requise

- **Tables** :
  - `eleves` (id uuid primary key, full_name text, email text)
  - `professeurs` (id uuid primary key, nom text, specialite text, tarif_horaire numeric)
  - `seances` (id bigint primary key, eleve_id uuid, professeur_id uuid, date_heure timestamp, devoir_url text, statut text, commentaire text)
- **Storage** :
  - Un bucket nommé `devoirs` avec accès public ou via RLS.
- **RLS Policies** :
  - Activer RLS sur toutes les tables pour garantir que chaque étudiant ne voit que ses propres données.

## Déploiement

L'application peut être facilement déployée sur Vercel ou Netlify en connectant votre dépôt GitHub.
