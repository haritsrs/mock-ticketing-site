'use client';

import React from 'react';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-6">Halaman Tidak Ditemukan</h2>
                <p className="text-xl text-gray-300 mb-12">
                    Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
                </p>
                
                <a 
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-lg"
                >
                    <Home size={24} />
                    Kembali ke Beranda
                </a>
            </div>
            
            <div className="mt-16 text-gray-400 text-center">
                <p>Butuh bantuan? Hubungi tim support kami di</p>
                <p className="text-purple-400">support@konserkita.id</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
