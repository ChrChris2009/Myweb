'use client';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Login() {
  
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirige l'utilisateur vers son espace de discussion après sa connexion
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error) {
      alert("Erreur lors de la connexion Google : " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4 text-3xl font-black">
        V
      </div>
      
      <h1 className="text-3xl font-bold mb-1">VibeNet</h1>
      <p className="text-purple-300/60 text-xs mb-8">L'application de messagerie nouvelle génération ✨</p>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-sm shadow-2xl">
        <h2 className="text-lg font-semibold mb-6 text-center">Rejoindre l'application</h2>
        
        {/* Bouton Gmail / Google */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black font-semibold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.6 0 11.2 0 14s.7 5.4 1.9 7.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-2.9l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16C3.7 19.8 7.5 23 12 23z"/>
          </svg>
          Continuer avec Gmail
        </button>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-3 text-[10px] text-gray-500 uppercase tracking-wider">ou</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Nom d'utilisateur" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-500"
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-500"
          />
          <Link href="/dashboard" className="block w-full pt-2">
            <button type="button" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl text-xs transition-all shadow-lg shadow-purple-600/20">
              Se connecter
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

