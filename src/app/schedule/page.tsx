"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight, Ticket } from 'lucide-react';

interface Concert {
  id: number;
  artist: string;
  date: string;
  day: number;
  time: string;
  venue: string;
  image: string;
  price: string;
  genre: string;
  attending: boolean;
}

const CalendarSchedulePage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Concert | null>(null);
  
  const concerts: Concert[] = [
    {
      id: 1,
      artist: "Tulus",
      date: "15 Feb 2025",
      day: 15,
      time: "19:30",
      venue: "Gelora Bung Karno, Jakarta",
      image: "/img/tulus.jpg",
      price: "Rp 750.000",
      genre: "Pop",
      attending: true
    },
    {
      id: 2,
      artist: "Raisa",
      date: "20 Feb 2025",
      day: 20,
      time: "20:00",
      venue: "ICE BSD, Tangerang",
      image: "/img/raisa.png",
      price: "Rp 850.000",
      genre: "Pop",
      attending: true
    },
    {
      id: 3,
      artist: "Maliq & D'Essentials",
      date: "1 Mar 2025",
      day: 1,
      time: "19:00",
      venue: "Summarecon Mall Serpong",
      image: "/img/maliq.jpg",
      price: "Rp 500.000",
      genre: "Jazz/Soul",
      attending: false
    },
    {
      id: 4,
      artist: "Noah",
      date: "25 Feb 2025",
      day: 25,
      time: "20:00",
      venue: "JCC Senayan, Jakarta",
      image: "/img/noah.jpg",
      price: "Rp 600.000",
      genre: "Rock",
      attending: false
    }
  ];

  // Calendar data
  const daysInMonth = 28; // February 2025
  const firstDayOfMonth = 5; // Friday
  const days: number[] = [...Array(daysInMonth + firstDayOfMonth).keys()];

  const getConcertForDay = (day: number): Concert | undefined => {
    return concerts.find(concert => concert.day === day && concert.date.includes('Feb'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Jadwal Konser</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/10">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">February 2025</h2>
            <button className="p-2 rounded-full hover:bg-white/10">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
              <div key={day} className="text-center text-purple-400 font-semibold p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((_, index) => {
              const day = index - firstDayOfMonth + 1;
              const concert = getConcertForDay(day);
              
              if (index < firstDayOfMonth || day > daysInMonth) {
                return <div key={index} className="aspect-square"></div>;
              }

              return (
                <div
                  key={index}
                  className={`aspect-square p-2 rounded-lg border ${
                    concert
                      ? concert.attending
                        ? 'border-purple-400 bg-purple-600/30 cursor-pointer hover:bg-purple-600/40'
                        : 'border-white/20 bg-white/10 cursor-pointer hover:bg-white/20'
                      : 'border-white/10 bg-white/5'
                  }`}
                  onClick={() => concert && setSelectedEvent(concert)}
                >
                  <div className="text-sm mb-1">{day}</div>
                  {concert && (
                    <div className="text-xs">
                      <div className="font-semibold truncate">{concert.artist}</div>
                      <div className="text-purple-400">{concert.time}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Event Details */}
        {selectedEvent && (
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.artist}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{selectedEvent.artist}</h3>
                  {selectedEvent.attending && (
                    <span className="px-3 py-1 bg-purple-500 rounded-full text-sm">
                      Akan Hadir
                    </span>
                  )}
                </div>
                
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={20} className="text-purple-400" />
                    <span>{selectedEvent.date} • {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-purple-400" />
                    <span>{selectedEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket size={20} className="text-purple-400" />
                    <span>{selectedEvent.price}</span>
                  </div>
                </div>

                {selectedEvent.attending && (
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                      Lihat Detail Tiket
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSchedulePage;