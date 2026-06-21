'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('messages');

  // 1. Vérifier si l'utilisateur est connecté via Gmail
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // 2. Charger les anciens messages et écouter les nouveaux en temps réel
    fetchMessages();
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', scheme: 'public', table: 'messages' }, (payload) => {
        setMessages((current) => [...current, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  // 3. Envoyer un message dans la base de données
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userEmail = user?.email || 'Anonyme';
    
    await supabase.from('messages').insert([
      { 
        content: newMessage, 
        sender: userEmail,
        created_at: new Date()
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex h-screen max-w-7xl mx-auto p-4 gap-4">
      {/* Colonne Gauche : Navigation et listes */}
      <div className="w-full md:w-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-3">
            VibeNet Chat
          </h1>
          <input 
            type="text" 
            placeholder="Rechercher un ami..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Liste d'amis fictive ou groupes */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 cursor-pointer border border-purple-500/20">
            <div className="relative w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full flex items-center justify-center font-bold text-xs">
              G
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold truncate">Groupe Général</h3>
              <p className="text-[11px] text-purple-300 truncate">Discussion en direct</p>
            </div>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
        </div>

        {/* Barre du bas de navigation (identique à tes captures d'écran) */}
        <div className="p-3 border-t border-white/10 bg-black/20 flex justify-around items-center text-xs text-gray-400">
          <button onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'text-purple-400 font-medium' : ''}>💬 Messages</button>
          <button onClick={() => setActiveTab('stories')} className={activeTab === 'stories' ? 'text-purple-400 font-medium' : ''}>🎬 Stories</button>
          <button onClick={() => setActiveTab('profil')} className={activeTab === 'profil' ? 'text-purple-400 font-medium' : ''}>👤 Profil</button>
        </div>
      </div>

      {/* Colonne Droite : La fenêtre de Discussion principale */}
      <div className="hidden md:flex flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-900 border border-purple-500/30 rounded-full flex items-center justify-center font-bold text-xs">G</div>
            <div>
              <h2 className="text-xs font-semibold">Groupe Général</h2>
              <span className="text-[9px] text-gray-400">{user ? `Connecté en tant que : ${user.email}` : 'Connexion...'}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/5 rounded-lg text-sm" title="Appel Audio">📞</button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-sm" title="Appel Vidéo"> 📹</button>
          </div>
        </div>

        {/* Zone d'affichage des messages de la base de données */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => {
            const isMe = msg.sender === user?.email;
            return (
              <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] text-gray-500 mb-0.5 px-1">{msg.sender}</span>
                <div className={`max-w-xs p-3 text-xs rounded-2xl shadow-sm ${
                  isMe 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Formulaire d'envoi */}
        <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black/10 flex gap-2">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrire un message en temps réel..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-500 text-white"
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl text-xs font-semibold transition-all">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
