"use client";

import React, { useState } from 'react';
import { Search, Calendar, Music, Ticket, MessageSquare, X, Send, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { generateConcertResponse } from '../utils/openai';

// Types
interface Banner {
  title: string;
  description: string;
  cta: string;
  icon: React.ReactNode;
  pattern: React.ReactNode;
}

interface Concert {
  id: number;
  artist: string;
  date: string;
  venue: string;
  image: string;
  price: string;
  genre: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PromotionalBannerProps {
  currentBanner: number;
  onNext: () => void;
  onPrev: () => void;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ConcertCardProps {
  concert: Concert;
}

// Constants
const BANNERS: Banner[] = [
  {
    title: "Promo Bank Mega",
    description: "Dapatkan diskon 20% untuk pembelian dengan Kartu Kredit Bank Mega!",
    cta: "Pelajari Selengkapnya",
    icon: <CreditCard className="text-purple-200" size={24} />,
    pattern: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#4c1d95', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grad1)"/>
        <rect width="100" height="100" fill="url(#grid)"/>
      </svg>
    )
  },
  {
    title: "Ed Sheeran Live in Jakarta",
    description: "Pre-sale dimulai 1 Maret 2025! Daftar sekarang untuk akses eksklusif.",
    cta: "Daftar Pre-sale",
    icon: <Music className="text-amber-200" size={24} />,
    pattern: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="circles" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.1)"/>
          </pattern>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#b45309', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#78350f', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grad2)"/>
        <rect width="100" height="100" fill="url(#circles)"/>
      </svg>
    )
  }
];

const UPCOMING_CONCERTS: Concert[] = [
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

// Components
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 bg-white/5 rounded-lg p-6">
    <div className="text-purple-400">{icon}</div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

const ConcertCard: React.FC<ConcertCardProps> = ({ concert }) => (
  <div className="bg-white/5 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
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
        <span className="text-purple-400 font-semibold">{concert.price}</span>
        <a href="/ticket" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
          Beli Tiket
        </a>
      </div>
    </div>
  </div>
);

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ currentBanner, onNext, onPrev }) => {
  const banner = BANNERS[currentBanner];

  return (
    <div className="relative overflow-hidden rounded-xl my-8">
      {banner.pattern}
      <div className="relative py-6 px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {banner.icon}
            <div>
              <h3 className="font-bold text-lg mb-1">{banner.title}</h3>
              <p className="text-sm md:text-base text-gray-200">{banner.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              {banner.cta}
            </button>
            <div className="flex gap-2">
              <button 
                onClick={onPrev}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={onNext}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatAssistant: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isThinking: boolean;
  userInput: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}> = ({ isOpen, onClose, messages, isThinking, userInput, onInputChange, onSendMessage }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg w-96 shadow-xl">
    <div className="p-4 border-b border-white/20 flex justify-between items-center">
      <h3 className="font-semibold">KonserKita AI Assistant</h3>
      <button onClick={onClose} className="text-gray-400 hover:text-white">
        <X size={20} />
      </button>
    </div>

    <div className="h-96 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
        >
          <div
            className={`inline-block p-3 rounded-lg ${
              message.role === 'user' ? 'bg-purple-600' : 'bg-white/10'
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
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Tanyakan tentang konser..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={onSendMessage}
          className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Saya KonserKita AI Assistant. Saya bisa membantu Anda menemukan konser yang sesuai dengan selera musik Anda. Apa genre musik favorit Anda?' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
  };

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white pb-24">
      <header className="container mx-auto px-4">
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
          <h2 className="text-5xl font-bold mb-4">Temukan Konser Favoritmu</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          <FeatureCard
            icon={<Calendar size={32} />}
            title="Jadwal Lengkap"
            description="Informasi konser terupdate"
          />
          <FeatureCard
            icon={<Music size={32} />}
            title="Artis Terbaik"
            description="Musisi lokal dan internasional"
          />
          <FeatureCard
            icon={<Ticket size={32} />}
            title="Booking Mudah"
            description="Proses pembelian cepat"
          />
        </div>
      </header>

      <div className="container mx-auto px-4">
        <PromotionalBanner 
          currentBanner={currentBanner}
          onNext={handleNextBanner}
          onPrev={handlePrevBanner}
        />

        <section>
          <h2 className="text-3xl font-bold mb-8">Konser Mendatang</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UPCOMING_CONCERTS.map(concert => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-purple-600 p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          >
            <MessageSquare size={24} />
          </button>
        ) : (
          <ChatAssistant
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            messages={messages}
            isThinking={isThinking}
            userInput={userInput}
            onInputChange={setUserInput}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;