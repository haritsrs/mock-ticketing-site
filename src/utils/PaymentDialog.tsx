import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Building, X } from 'lucide-react';

const PaymentDialog = ({ isOpen, onClose, selectedSeats, sections, calculateTotal }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'credit-card',
      title: 'Kartu Kredit/Debit',
      description: 'Visa, Mastercard, JCB',
      icon: CreditCard
    },
    {
      id: 'e-wallet',
      title: 'E-Wallet',
      description: 'GoPay, OVO, DANA',
      icon: Wallet
    },
    {
      id: 'bank-transfer',
      title: 'Transfer Bank',
      description: 'BCA, Mandiri, BNI',
      icon: Building
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-gradient-to-b from-purple-900/90 to-black/90 text-white backdrop-blur-lg border border-white/20 rounded-lg shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:text-purple-400 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 pb-0">
          <h2 className="text-2xl font-semibold">Detail Pembayaran</h2>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nama sesuai kartu identitas"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white/10 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Ringkasan Pesanan</h3>
            {Object.entries(selectedSeats).map(([sectionId, quantity]) => (
              quantity > 0 && (
                <div key={sectionId} className="flex justify-between text-sm">
                  <span>{sections[sectionId].name} × {quantity}</span>
                  <span>Rp {(sections[sectionId].price * quantity).toLocaleString('id-ID')}</span>
                </div>
              )
            ))}
            <div className="border-t border-white/20 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">
              Metode Pembayaran
            </label>
            <div className="space-y-2">
              {paymentMethods.map(({ id, title, description, icon: Icon }) => (
                <label
                  key={id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer border transition-colors ${
                    paymentMethod === id
                      ? 'bg-white/20 border-purple-500'
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={id}
                    checked={paymentMethod === id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <Icon className="h-5 w-5" />
                  <div className="flex-1">
                    <div>{title}</div>
                    <div className="text-sm text-gray-400">{description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentDialog;