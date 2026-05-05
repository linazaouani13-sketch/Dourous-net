# Dourous-Net 🎓 - Projet Build & Ship

Dourous-Net est une plateforme d'éducation "Extranet" permettant aux élèves de réserver des séances avec des professeurs et de soumettre leurs devoirs. Ce projet suit l'architecture **Serverless** moderne en utilisant **React (Vite)**, **Supabase** et **Vercel**.

---

## 🎯 Mapping du Thème : Éducation
Conformément aux exigences du projet, l'architecture est modélisée comme suit :

- **Table A (Utilisateurs)** : `eleves` (Gérée via Supabase Auth).
- **Table B (Ressources)** : `professeurs` (Liste des enseignants disponibles).
- **Table C (Interactions)** : `seances` (Lien entre élève et professeur avec date et statut).
- **Storage (Fichiers)** : Bucket `devoirs` (Stockage des scans PDF des devoirs).

## 🏛️ Analyse d'Architecture (Rapport Architecte)

### 1. Pourquoi Vercel + Supabase vs Serveur Classique ? (CAPEX/OPEX)
L'utilisation de Vercel et Supabase transforme le modèle de coût du projet. 
- **Économie de CAPEX** : Avec un serveur classique, il faudrait investir dans du matériel physique (Serveurs, Racks) ou des instances réservées coûteuses avant même d'avoir un utilisateur. Ici, le CAPEX est de **0$**.
- **Optimisation de l'OPEX** : Nous passons à un modèle de **"Pay-as-you-go"**. Les coûts opérationnels sont proportionnels à l'utilisation réelle. Pour un projet étudiant ou une startup, c'est la stratégie la plus logique car elle élimine les risques financiers liés au sur-provisionnement.

### 2. Gestion de la Scalabilité : Vercel vs Data Center Local
Vercel gère la scalabilité de manière **horizontale et automatique** via des "Edge Functions" et un CDN mondial. 
- Dans un **Data Center local**, la scalabilité est limitée par la climatisation, l'espace physique et la puissance électrique disponible. Ajouter de la capacité prend des semaines.
- Sur **Vercel**, si le trafic multiplie par 1000 en une seconde, l'infrastructure Serverless s'adapte instantanément sans intervention humaine.

### 3. Données Structurées vs Non-structurées
- **Données Structurées** : Ce sont les informations stockées dans les tables PostgreSQL de Supabase (`eleves`, `professeurs`, `seances`). Elles suivent un schéma strict (ID, Clés étrangères, Dates).
- **Données Non-structurées** : Ce sont les fichiers PDF des devoirs stockés dans **Supabase Storage**. Contrairement à une base de données, ces fichiers n'ont pas de structure interne prévisible pour le système, ils sont donc gérés comme des "objets" (BLOBs).

3. **Déploiement CI/CD** : Connectez votre repo GitHub à Vercel. Chaque `git push` déclenchera un nouveau build.
Construit avec l'approche **Vibe Coding** pour le module Architecture Cloud.
