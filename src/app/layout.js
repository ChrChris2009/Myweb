// src/app/layout.js
import './globals.css'; // Contient les directives Tailwind

export const metadata = {
  title: 'VibeNet - L\'évolution de la messagerie',
  description: 'Connectez-vous avec vos amis instantanément',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
