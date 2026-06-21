// src/app/page.js
'use client';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Logo futuriste */}
      <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4 text-4xl font-black">
        V
      </div>
      
      <h1 className="text-3xl font-bold mb-2">VibeNet</h1>
      <p className="text-purple-300/70 text-sm mb-8">Bon retour parmi nous ✨</p>

      {/* Carte Glassmorphism */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center">Se connecter</h2>
        
        <form className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Nom d'utilisateur ou email" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 transition-all placeholder:text-gray-500"
            />
          </div>
          
          <div>
            <input 
              type="password" 
              placeholder="Mot de passe" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 transition-all placeholder:text-gray-500"
            />
          </div>

          <Link href="/dashboard" className="block w-full">
            <button type="button" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-4 rounded-2xl shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98]">
              Se connecter
            </button>
          </Link>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-purple-400 hover:underline font-medium">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

