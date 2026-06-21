mon-app-messagerie/
├── public/                 # Images, icônes, logos
├── src/
│   ├── app/                # Pages et routes de l'application
│   │   ├── layout.js       # Layout principal (configuration globale)
│   │   ├── page.js         # Page d'accueil / Connexion
│   │   ├── register/       # Page d'inscription
│   │   │   └── page.js
│   │   ├── dashboard/      # Interface principale après connexion
│   │   │   └── page.js
│   ├── components/         # Composants réutilisables
│   │   ├── Sidebar.js      # Barre latérale (Messages, Stories, Profil)
│   │   ├── ChatWindow.js   # Fenêtre de discussion active
│   │   └── ProfileView.js  # Section profil et statistiques
└── package.json            # Dépendances du projet

