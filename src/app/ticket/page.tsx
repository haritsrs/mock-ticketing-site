"use client";

import React, { useState } from 'react';
import { MinusCircle, PlusCircle, Info, Calendar, MapPin } from 'lucide-react';
import PaymentDialog from '../../utils/PaymentDialog';

interface ConcertInfo {
  artist: string;
  tourName: string;
  date: string;
  time: string;
  venue: string;
}

interface Section {
  name: string;
  price: number;
  available: number;
  color: string;
  description: string;
}

interface Sections {
  vvip: Section;
  vip: Section;
  festivalA: Section;
  festivalB: Section;
  tribune: Section;
}

type SectionId = keyof Sections;
type SelectedSeats = Partial<Record<SectionId, number>>;

const ConcertSeating: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<SectionId | ''>('');
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeats>({});
  
  const concertInfo: ConcertInfo = {
    artist: "TULUS",
    tourName: "TULUS Tour 2025: Manusia",
    date: "15 Februari 2025",
    time: "19:00 WIB",
    venue: "Gelora Bung Karno, Jakarta"
  };

  const sections: Sections = {
    vvip: { 
      name: 'VVIP', 
      price: 2500000,
      available: 50,
      color: 'rgb(139, 92, 246)',
      description: 'Termasuk meet & greet, goodie bag eksklusif'
    },
    vip: { 
      name: 'VIP', 
      price: 1500000,
      available: 100,
      color: 'rgb(219, 39, 119)',
      description: 'Termasuk goodie bag'
    },
    festivalA: { 
      name: 'Festival A', 
      price: 1000000,
      available: 200,
      color: 'rgb(59, 130, 246)',
      description: 'Area berdiri depan'
    },
    festivalB: { 
      name: 'Festival B', 
      price: 750000,
      available: 300,
      color: 'rgb(16, 185, 129)',
      description: 'Area berdiri belakang'
    },
    tribune: { 
      name: 'Tribune', 
      price: 500000,
      available: 400,
      color: 'rgb(245, 158, 11)',
      description: 'Tempat duduk tribune'
    }
  };

  const handleSectionClick = (sectionId: SectionId) => {
    setSelectedSection(sectionId);
  };

  const handleUpdateQuantity = (section: SectionId, delta: number) => {
    const currentQty = selectedSeats[section] || 0;
    const newQty = Math.max(0, currentQty + delta);
    if (newQty <= sections[section].available) {
      setSelectedSeats(prev => ({
        ...prev,
        [section]: newQty
      }));
    }
  };

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const calculateTotal = (): number => {
    return Object.entries(selectedSeats).reduce((total, [section, qty]) => {
      return total + (sections[section as SectionId].price * (qty || 0));
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Concert Info Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{concertInfo.artist}</h1>
          <h2 className="text-2xl text-purple-400 mb-4">{concertInfo.tourName}</h2>
          <div className="flex justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{concertInfo.date} • {concertInfo.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>{concertInfo.venue}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seating Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Peta Tempat Duduk</h2>
              </div>
              <div className="p-6 pt-0">
                {/* SVG Venue Map */}
                <svg viewBox="0 0 800 500" className="w-full h-auto mb-6">
                  <rect width="800" height="500" fill="#1a1a1a"/>
                  
                  {/* Stage */}
                  <rect x="250" y="30" width="300" height="80" fill="#4a4a4a"/>
                  <text x="400" y="75" fill="white" textAnchor="middle" fontSize="24">PANGGUNG</text>
                  
                  {/* VVIP Section */}
                  <rect 
                    x="300" y="130" width="200" height="60" 
                    fill={sections.vvip.color}
                    opacity={selectedSection === 'vvip' ? '1' : '0.7'}
                    onClick={() => handleSectionClick('vvip')}
                    className="cursor-pointer transition-opacity duration-200"
                  />
                  <text x="400" y="165" fill="white" textAnchor="middle" fontSize="16">VVIP</text>
                  
                  {/* VIP Section */}
                  <rect 
                    x="250" y="210" width="300" height="80" 
                    fill={sections.vip.color}
                    opacity={selectedSection === 'vip' ? '1' : '0.7'}
                    onClick={() => handleSectionClick('vip')}
                    className="cursor-pointer transition-opacity duration-200"
                  />
                  <text x="400" y="255" fill="white" textAnchor="middle" fontSize="16">VIP</text>
                  
                  <path 
                    d="M200 320 Q400 330 600 320 Q600 380 400 378 Q200 380 200 320" 
                    fill={sections.festivalA.color}
                    opacity={selectedSection === 'festivalA' ? '1' : '0.7'}
                    onClick={() => handleSectionClick('festivalA')}
                    className="cursor-pointer transition-opacity duration-200"
                  />
                  <text x="400" y="355" fill="white" textAnchor="middle" fontSize="16">FESTIVAL A</text>

                  {/* Festival B */}
                  <path 
                    d="M150 390 Q400 400 650 390 Q650 450 400 460 Q150 450 150 390" 
                    fill={sections.festivalB.color}
                    opacity={selectedSection === 'festivalB' ? '1' : '0.7'}
                    onClick={() => handleSectionClick('festivalB')}
                    className="cursor-pointer transition-opacity duration-200"
                  />
                  <text x="400" y="420" fill="white" textAnchor="middle" fontSize="16">FESTIVAL B</text>
                  
                  {/* Tribune Sections */}
                  <rect 
                    x="150" y="130" width="80" height="180" 
                    fill={sections.tribune.color}
                    opacity={selectedSection === 'tribune' ? '1' : '0.7'}
                    onClick={() => handleSectionClick('tribune')}
                    className="cursor-pointer transition-opacity duration-200"
                  />
                  <rect 
                    x="570" y="130" width="80" height="180" 
                    fill={sections.tribune.color}
                    opacity={selectedSection === 'tribune' ? '1' : '0.7'}
                    onClick={() => handleSectionClick('tribune')}
                    className="cursor-pointer transition-opacity duration-200"
                  />
                  <text x="190" y="220" fill="white" textAnchor="middle" fontSize="16" transform="rotate(-90, 190, 220)">TRIBUNE</text>
                  <text x="610" y="220" fill="white" textAnchor="middle" fontSize="16" transform="rotate(90, 610, 220)">TRIBUNE</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Ticket Selection */}
          <div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-semibold">Pilih Tiket</h2>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  {(Object.entries(sections) as [SectionId, Section][]).map(([sectionId, info]) => (
                    <div key={sectionId} 
                         className={`p-4 rounded-lg transition-colors duration-200 ${
                           selectedSection === sectionId ? 'bg-white/20' : 'bg-white/5'
                         }`}
                         onClick={() => handleSectionClick(sectionId)}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{info.name}</h3>
                          <p className="text-sm text-gray-400">
                            Rp {info.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateQuantity(sectionId, -1);
                            }}
                            className="p-1 hover:text-purple-400"
                            disabled={!selectedSeats[sectionId]}
                          >
                            <MinusCircle size={20} />
                          </button>
                          <span className="w-8 text-center">
                            {selectedSeats[sectionId] || 0}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateQuantity(sectionId, 1);
                            }}
                            className="p-1 hover:text-purple-400"
                            disabled={(selectedSeats[sectionId] || 0) >= info.available}
                          >
                            <PlusCircle size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-400">
                        <Info size={16} className="mt-1 flex-shrink-0" />
                        <p>{info.description}</p>
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        Sisa: {info.available} tiket
                      </div>
                    </div>
                  ))}

                  {Object.keys(selectedSeats).length > 0 && (
                    <div className="mt-6">
                      <div className="flex justify-between text-lg font-semibold mb-4">
                        <span>Total</span>
                        <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                      </div>
                      <button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
                        onClick={() => setIsPaymentDialogOpen(true)}
                      >
                        Lanjut ke Pembayaran
                      </button>
                    </div>
                  )}

                  <div className="mt-4 bg-white/5 border border-purple-500 rounded-lg p-4">
                    <p className="text-sm">
                      Maksimal pembelian 4 tiket per kategori. Harga sudah termasuk pajak dan biaya layanan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        selectedSeats={selectedSeats}
        sections={sections}
        calculateTotal={calculateTotal}
      />
    </div>
  );
};

export default ConcertSeating;