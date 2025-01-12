"use client";

import React, { useState } from 'react';
import { Search, Calendar, Music, Ticket, MessageSquare, X, Send } from 'lucide-react';
import { generateConcertResponse } from '../utils/openai';

const LandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Halo! Saya KonserKita AI Assistant. Saya bisa membantu Anda menemukan konser yang sesuai dengan selera musik Anda. Apa genre musik favorit Anda?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const upcomingConcerts = [
    {
      id: 1,
      artist: "Tulus",
      date: "15 Feb 2025",
      venue: "Gelora Bung Karno, Jakarta",
      image: "/img/tulus.jpg",
      price: "Rp 750.000",
      genre: "Pop"
    },
    {
      id: 2,
      artist: "Raisa",
      date: "20 Feb 2025",
      venue: "ICE BSD, Tangerang",
      image: "/img/raisa.png",
      price: "Rp 850.000",
      genre: "Pop"
    },
    {
      id: 3,
      artist: "Maliq & D'Essentials",
      date: "1 Mar 2025",
      venue: "Summarecon Mall Serpong",
      image: "/img/maliq.jpg",
      price: "Rp 500.000",
      genre: "Jazz/Soul"
    }
  ];

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const userMessage = userInput.trim();
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setUserInput('');
      setIsThinking(true);

      try {
        const aiResponse = await generateConcertResponse(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.' 
        }]);
      }

      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Previous header and sections remain the same */}
      <header className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold">KonserKita</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 hover:text-purple-300">Login</button>
            <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
              Daftar
            </button>
          </div>
        </nav>

        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Temukan Konser Favoritmu
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Beli tiket konser dengan mudah dan aman
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Cari artis atau konser..."
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:border-purple-500"
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex items-center gap-4 bg-white/5 rounded-lg p-6">
            <Calendar className="text-purple-400" size={32} />
            <div>
              <h3 className="font-semibold mb-1">Jadwal Lengkap</h3>
              <p className="text-gray-400">Informasi konser terupdate</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 rounded-lg p-6">
            <Music className="text-purple-400" size={32} />
            <div>
              <h3 className="font-semibold mb-1">Artis Terbaik</h3>
              <p className="text-gray-400">Musisi lokal dan internasional</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 rounded-lg p-6">
            <Ticket className="text-purple-400" size={32} />
            <div>
              <h3 className="font-semibold mb-1">Booking Mudah</h3>
              <p className="text-gray-400">Proses pembelian cepat</p>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Konser Mendatang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingConcerts.map(concert => (
            <div key={concert.id} className="bg-white/5 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <img
                src={concert.image}
                alt={concert.artist}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{concert.artist}</h3>
                <p className="text-gray-400 mb-2">{concert.date}</p>
                <p className="text-gray-400 mb-4">{concert.venue}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400 font-semibold">
                    {concert.price}
                  </span>
                    <a href="/ticket" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
                    Beli Tiket
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-purple-600 p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          >
            <MessageSquare size={24} />
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg w-96 shadow-xl">
            <div className="p-4 border-b border-white/20 flex justify-between items-center">
              <h3 className="font-semibold">KonserKita AI Assistant</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-purple-600'
                        : 'bg-white/10'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="text-gray-400">AI Assistant sedang mengetik...</div>
              )}
            </div>

            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tanyakan tentang konser..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;