"use client";

import React, { useState } from 'react';
import { User, Ticket, Star, Bell, CreditCard, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const mockUser = {
    name: "Harits Raharjo Setiono",
    email: "harits@gmail.com",
    joinDate: "January 2025",
    profileImage: "/img/profil.jpg",
    upcomingBookings: [
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
    pastBookings: [
      {
        id: 2,
        artist: "Raisa",
        date: "10 Dec 2024",
        venue: "ICE BSD, Tangerang",
        ticketType: "Regular",
        price: "Rp 500.000",
        status: "Completed"
      }
    ],
    reviews: [
      {
        id: 1,
        artist: "Raisa",
        rating: 5,
        review: "Konser yang luar biasa! Suasananya sangat meriah.",
        date: "12 Dec 2024"
      }
    ],
    notifications: [
      {
        id: 1,
        type: "reminder",
        message: "Konser Tulus akan berlangsung dalam 3 hari",
        date: "12 Feb 2025"
      },
      {
        id: 2,
        type: "promo",
        message: "Dapatkan diskon 20% untuk konser Maliq & D'Essentials",
        date: "10 Jan 2025"
      }
    ]
  };

  const renderProfileContent = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <img
          src={mockUser.profileImage}
          alt={mockUser.name}
          className="w-32 h-32 rounded-full border-4 border-purple-600"
        />
        <div>
          <h2 className="text-2xl font-bold">{mockUser.name}</h2>
          <p className="text-gray-400">Member sejak {mockUser.joinDate}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Informasi Pribadi</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400">Email</label>
              <p>{mockUser.email}</p>
            </div>
            <div>
              <label className="text-gray-400">Nomor Telepon</label>
              <p>+62 812-3456-7890</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
          <div className="flex items-center gap-4 bg-white/10 rounded p-4">
            <CreditCard className="text-purple-400" />
            <div>
              <p>Visa ****4589</p>
              <p className="text-gray-400">Expires 12/25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingsContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Booking Mendatang</h3>
        {mockUser.upcomingBookings.map(booking => (
          <div key={booking.id} className="bg-white/5 rounded-lg p-6 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{booking.artist}</h4>
                <p className="text-gray-400">{booking.date}</p>
                <p className="text-gray-400">{booking.venue}</p>
                <p className="mt-2">Tiket: {booking.ticketType}</p>
              </div>
              <div className="text-right">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  {booking.status}
                </span>
                <p className="mt-2 text-purple-400">{booking.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Booking Selesai</h3>
        {mockUser.pastBookings.map(booking => (
          <div key={booking.id} className="bg-white/5 rounded-lg p-6 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{booking.artist}</h4>
                <p className="text-gray-400">{booking.date}</p>
                <p className="text-gray-400">{booking.venue}</p>
                <p className="mt-2">Tiket: {booking.ticketType}</p>
              </div>
              <div className="text-right">
                <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm">
                  {booking.status}
                </span>
                <p className="mt-2 text-purple-400">{booking.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviewsContent = () => (
    <div className="space-y-6">
      {mockUser.reviews.map(review => (
        <div key={review.id} className="bg-white/5 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-semibold">{review.artist}</h4>
            <div className="flex items-center gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-gray-200 mb-2">{review.review}</p>
          <p className="text-gray-400 text-sm">{review.date}</p>
        </div>
      ))}
    </div>
  );

  const renderNotificationsContent = () => (
    <div className="space-y-4">
      {mockUser.notifications.map(notification => (
        <div key={notification.id} className="bg-white/5 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600/20 p-2 rounded-lg">
              <Bell size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-200">{notification.message}</p>
              <p className="text-gray-400 text-sm mt-1">{notification.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Profil Saya</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">
            <LogOut size={20} />
            Keluar
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-white/10">
          {[
            { id: 'profile', label: 'Profil', icon: User },
            { id: 'bookings', label: 'Booking', icon: Ticket },
            { id: 'reviews', label: 'Ulasan', icon: Star },
            { id: 'notifications', label: 'Notifikasi', icon: Bell }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'profile' && renderProfileContent()}
          {activeTab === 'bookings' && renderBookingsContent()}
          {activeTab === 'reviews' && renderReviewsContent()}
          {activeTab === 'notifications' && renderNotificationsContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;