# Dourous-Net 🎓

Dourous-Net is a premium full-stack education platform built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**. It allows students to book private sessions with expert teachers, upload homework for review, and manage their academic schedule in a sleek, high-performance interface.

## 🚀 Key Features

- **Expert Market**: Browse certified teachers with specific specialities.
- **Secure Booking**: Intuitive scheduling with future-date validation.
- **Smart Homework Upload**: Secure PDF management using Supabase Private Storage.
- **Dynamic Dashboards**: Real-time updates for students.
- **Dark/Light Mode**: Premium visual experience with persistence.
- **Robust Auth**: Secure login/signup with automated profile creation.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4.
- **Backend**: Supabase (Auth, Database, Storage).
- **Routing**: React Router DOM v7.
- **Icons**: Lucide React.
- **Toast Notifications**: React Hot Toast.

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd dourous-net
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

- **Context API**: Managed authentication (`AuthContext`) and theme state (`ThemeContext`).
- **Supabase Client**: Centralized instance in `src/lib/supabaseClient.js`.
- **Protected Routes**: HOC logic in `src/components/ProtectedRoute.jsx` ensures only authenticated students access the dashboard.
- **Responsive Components**: Every UI element is built with mobile-first responsiveness in mind using Tailwind CSS.

---

Built with ❤️ by Antigravity expert developers.
