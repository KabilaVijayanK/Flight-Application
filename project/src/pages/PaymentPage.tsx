import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Wallet, CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const PaymentPage = () => {
  const { selectedFlight, selectedSeats, setCurrentStep, passengers, addBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedFlight) return null;

  const totalSeatPrice = selectedSeats.reduce((sum, seatId) => {
    const row = parseInt(seatId.match(/\d+/)?.[0] || '0');
    return sum + (row <= 3 ? 500 : 200);
  }, 0);

  const basePrice = selectedFlight.price;
  const taxes = Math.floor(basePrice * 0.12);
  const convenienceFee = 150;
  const totalAmount = basePrice + totalSeatPrice + taxes + convenienceFee;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const booking = {
        id: `BK${Date.now()}`,
        pnr: `PNR${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        flight: selectedFlight,
        passengers,
        totalPrice: totalAmount,
        bookingDate: new Date().toISOString(),
        status: 'confirmed' as const,
      };
      addBooking(booking);
      setIsProcessing(false);
      setCurrentStep('confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setCurrentStep('passengers')}
            className="flex items-center gap-2 text-[#1A73E8] hover:text-[#1557B0] font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Passenger Details
          </button>
        </div>
     

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#0B2948] mb-2">Payment</h2>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`p-6 rounded-xl border-2 transition-all ${
              paymentMethod === 'card'
                ? 'border-[#1A73E8] bg-blue-50'
                : 'border-[#DDDDDD] bg-white hover:border-gray-300'
            }`}
          >
            <CreditCard
              className={`w-10 h-10 mx-auto mb-3 ${
                paymentMethod === 'card' ? 'text-[#1A73E8]' : 'text-gray-400'
              }`}
            />
            <div className="font-semibold text-[#0B2948]">Credit/Debit Card</div>
            <div className="text-sm text-gray-600 mt-1">Visa, Mastercard, etc.</div>
          </button>

          <button
            onClick={() => setPaymentMethod('upi')}
            className={`p-6 rounded-xl border-2 transition-all ${
              paymentMethod === 'upi'
                ? 'border-[#1A73E8] bg-blue-50'
                : 'border-[#DDDDDD] bg-white hover:border-gray-300'
            }`}
          >
            <Smartphone
              className={`w-10 h-10 mx-auto mb-3 ${
                paymentMethod === 'upi' ? 'text-[#1A73E8]' : 'text-gray-400'
              }`}
            />
            <div className="font-semibold text-[#0B2948]">UPI</div>
            <div className="text-sm text-gray-600 mt-1">Google Pay, PhonePe, etc.</div>
          </button>

          <button
            onClick={() => setPaymentMethod('wallet')}
            className={`p-6 rounded-xl border-2 transition-all ${
              paymentMethod === 'wallet'
                ? 'border-[#1A73E8] bg-blue-50'
                : 'border-[#DDDDDD] bg-white hover:border-gray-300'
            }`}
          >
            <Wallet
              className={`w-10 h-10 mx-auto mb-3 ${
                paymentMethod === 'wallet' ? 'text-[#1A73E8]' : 'text-gray-400'
              }`}
            />
            <div className="font-semibold text-[#0B2948]">Wallet</div>
            <div className="text-sm text-gray-600 mt-1">Paytm, Amazon Pay, etc.</div>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          {paymentMethod === 'card' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                />
              </div>

              <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
                <div className="w-48 h-48 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
                  <div className="text-6xl">📱</div>
                </div>
                <p className="text-sm text-gray-600">
                  Scan QR code with any UPI app to complete payment
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'].map((wallet) => (
                  <button
                    key={wallet}
                    className="p-4 border-2 border-[#DDDDDD] rounded-lg hover:border-[#1A73E8] hover:bg-blue-50 transition-all"
                  >
                    <div className="font-semibold text-[#0B2948]">{wallet}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-bold text-[#0B2948] mb-6">Payment Summary</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[#333333]">
              <span>Base Fare ({passengers.length} Passenger{passengers.length > 1 ? 's' : ''})</span>
              <span className="font-semibold">₹{basePrice.toLocaleString()}</span>
            </div>

            {totalSeatPrice > 0 && (
              <div className="flex justify-between text-[#333333]">
                <span>Seat Selection</span>
                <span className="font-semibold">₹{totalSeatPrice.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-[#333333]">
              <span>Taxes & GST</span>
              <span className="font-semibold">₹{taxes.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-[#333333]">
              <span>Convenience Fee</span>
              <span className="font-semibold">₹{convenienceFee}</span>
            </div>

            <div className="border-t-2 border-[#DDDDDD] pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-[#0B2948]">Total Amount</span>
              <span className="text-3xl font-bold text-[#1A73E8]">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-[#1A73E8] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#1A73E8] mt-0.5" />
              <div className="text-sm text-[#333333]">
                Your payment is secured with 256-bit SSL encryption. We never store your card
                details.
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#20C997] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1AB386] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </>
            ) : (
              <>Pay ₹{totalAmount.toLocaleString()}</>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            By completing this payment, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};
