"use client";

import React from 'react';
import { Ticket } from 'lucide-react';

const BookingsPage = () => {
  const mockBookings = {
    upcoming: [
      {
        id: 1,
        artist: "Tulus",
        date: "15 Feb 2025",
        venue: "Gelora Bung Karno, Jakarta",
        ticketType: "VIP",
        price: "Rp 750.000",
        status: "Confirmed"
      }
    ],
    past: [
      {
        id: 2,
        artist: "Raisa",
        date: "10 Dec 2024",
        venue: "ICE BSD, Tangerang",
        ticketType: "Regular",
        price: "Rp 500.000",
        status: "Completed"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Ticket size={28} className="text-purple-400" />
          <h1 className="text-2xl font-bold">My Bookings</h1>
        </div>

        <div className="space-y-8">
          {/* Upcoming Bookings Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-purple-400">Upcoming Events</h2>
            <div className="grid gap-4">
              {mockBookings.upcoming.map(booking => (
                <div key={booking.id} className="bg-white/5 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.artist}</h3>
                      <p className="text-gray-400">{booking.date}</p>
                      <p className="text-gray-400">{booking.venue}</p>
                      <div className="mt-4 space-y-2">
                        <p>Ticket Type: {booking.ticketType}</p>
                        <p className="text-purple-400">{booking.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        {booking.status}
                      </span>
                      <button className="block mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Bookings Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-400">Past Events</h2>
            <div className="grid gap-4">
              {mockBookings.past.map(booking => (
                <div key={booking.id} className="bg-white/5 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.artist}</h3>
                      <p className="text-gray-400">{booking.date}</p>
                      <p className="text-gray-400">{booking.venue}</p>
                      <div className="mt-4 space-y-2">
                        <p>Ticket Type: {booking.ticketType}</p>
                        <p className="text-purple-400">{booking.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm">
                        {booking.status}
                      </span>
                      <button className="block mt-4 bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;