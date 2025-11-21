import { useState } from 'react';
import { ArrowLeft, Briefcase, Coffee, Wifi, Clock, MapPin, Info } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SeatMapSeat } from '../types';

export const FlightDetailsPage = () => {
  const { selectedFlight, setCurrentStep, selectedSeats, setSelectedSeats } = useBooking();
  const [activeTab, setActiveTab] = useState<'details' | 'baggage' | 'fare' | 'seats'>('details');

  if (!selectedFlight) return null;

  const seatMap: SeatMapSeat[] = [];
  const rows = 20;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (let row = 1; row <= rows; row++) {
    for (const col of columns) {
      const isPremium = row <= 3;
      const isOccupied = Math.random() > 0.6;
      seatMap.push({
        row,
        column: col,
        status: isOccupied ? 'occupied' : isPremium ? 'premium' : 'available',
        price: isPremium ? 500 : 200,
      });
    }
  }

  const handleSeatClick = (seat: SeatMapSeat) => {
    const seatId = `${seat.row}${seat.column}`;
    if (seat.status === 'occupied') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalSeatPrice = selectedSeats.reduce((sum, seatId) => {
    const row = parseInt(seatId.match(/\d+/)?.[0] || '0');
    return sum + (row <= 3 ? 500 : 200);
  }, 0);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
     
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setCurrentStep('results')}
            className="flex items-center gap-2 text-[#1A73E8] hover:text-[#1557B0] font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Results
          </button>
        </div>
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#F5F7FA] rounded-xl flex items-center justify-center text-3xl">
                {selectedFlight.airlineLogo}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0B2948]">
                  {selectedFlight.airline}
                </h2>
                <p className="text-gray-600">{selectedFlight.flightNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#1A73E8]">
                ₹{selectedFlight.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">per person</div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#F5F7FA] rounded-xl p-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0B2948] mb-1">
                {selectedFlight.departureTime}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {selectedFlight.from.code}
              </div>
              <div className="text-sm text-gray-600">{selectedFlight.from.city}</div>
            </div>

            <div className="flex-1 px-8">
              <div className="relative">
                <div className="h-px bg-[#DDDDDD] w-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-[#1A73E8]">
                      {selectedFlight.duration}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} stop(s)`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-[#0B2948] mb-1">
                {selectedFlight.arrivalTime}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {selectedFlight.to.code}
              </div>
              <div className="text-sm text-gray-600">{selectedFlight.to.city}</div>
            </div>
          </div>

          <div className="flex gap-4 mb-6 overflow-x-auto">
            {[
              { id: 'details', label: 'Flight Details', icon: Info },
              { id: 'baggage', label: 'Baggage', icon: Briefcase },
              { id: 'fare', label: 'Fare Rules', icon: Clock },
              { id: 'seats', label: 'Select Seats', icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1A73E8] text-white'
                    : 'bg-[#F5F7FA] text-[#333333] hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0B2948] mb-4">Flight Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-[#F5F7FA] rounded-lg">
                    <Wifi className="w-6 h-6 text-[#1A73E8]" />
                    <span className="font-medium text-[#333333]">Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#F5F7FA] rounded-lg">
                    <Coffee className="w-6 h-6 text-[#1A73E8]" />
                    <span className="font-medium text-[#333333]">Meals</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#F5F7FA] rounded-lg">
                    <Briefcase className="w-6 h-6 text-[#1A73E8]" />
                    <span className="font-medium text-[#333333]">Baggage</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#F5F7FA] rounded-lg">
                    <Clock className="w-6 h-6 text-[#1A73E8]" />
                    <span className="font-medium text-[#333333]">On-time</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0B2948] mb-4">Important Information</h3>
                <div className="space-y-3 text-[#333333]">
                  <p className="flex items-start gap-2">
                    <span className="text-[#1A73E8] mt-1">•</span>
                    Check-in begins 3 hours before departure
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#1A73E8] mt-1">•</span>
                    Valid ID proof required for all passengers
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#1A73E8] mt-1">•</span>
                    Please arrive at least 2 hours before departure
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'baggage' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0B2948] mb-4">Baggage Allowance</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#F5F7FA] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="w-8 h-8 text-[#1A73E8]" />
                      <h4 className="font-bold text-[#0B2948]">Cabin Baggage</h4>
                    </div>
                    <ul className="space-y-2 text-[#333333]">
                      <li>• 7 kg per passenger</li>
                      <li>• 1 piece allowed</li>
                      <li>• Max dimensions: 55x35x25 cm</li>
                    </ul>
                  </div>
                  <div className="bg-[#F5F7FA] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="w-8 h-8 text-[#FF7A00]" />
                      <h4 className="font-bold text-[#0B2948]">Check-in Baggage</h4>
                    </div>
                    <ul className="space-y-2 text-[#333333]">
                      <li>• 15 kg per passenger</li>
                      <li>• Additional baggage available for purchase</li>
                      <li>• ₹500 per additional 5 kg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fare' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0B2948] mb-4">Cancellation & Changes</h3>
                <div className="bg-[#F5F7FA] rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#0B2948] mb-2">Cancellation Policy</h4>
                    <ul className="space-y-2 text-[#333333]">
                      <li>• More than 4 hours before departure: ₹2,000 fee</li>
                      <li>• 2-4 hours before departure: ₹3,500 fee</li>
                      <li>• Less than 2 hours: No refund</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B2948] mb-2">Date Change Policy</h4>
                    <ul className="space-y-2 text-[#333333]">
                      <li>• Date change fee: ₹2,500 + fare difference</li>
                      <li>• Changes allowed up to 2 hours before departure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seats' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0B2948] mb-4">Select Your Seats</h3>
                <div className="flex gap-6 mb-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#20C997] rounded"></div>
                    <span className="text-sm text-[#333333]">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FF7A00] rounded"></div>
                    <span className="text-sm text-[#333333]">Premium (₹500)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    <span className="text-sm text-[#333333]">Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1A73E8] rounded"></div>
                    <span className="text-sm text-[#333333]">Selected</span>
                  </div>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-6 overflow-x-auto">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-[#0B2948] text-white px-8 py-2 rounded-t-xl font-semibold">
                      Front of Aircraft
                    </div>
                  </div>

                  <div className="flex justify-center gap-12 mb-4">
                    <div className="grid grid-cols-3 gap-2">
                      {columns.slice(0, 3).map((col) => (
                        <div key={col} className="w-10 text-center font-semibold text-gray-600">
                          {col}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {columns.slice(3).map((col) => (
                        <div key={col} className="w-10 text-center font-semibold text-gray-600">
                          {col}
                        </div>
                      ))}
                    </div>
                  </div>

                  {Array.from({ length: rows }, (_, i) => i + 1).map((row) => (
                    <div key={row} className="flex justify-center gap-12 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-600 w-6">{row}</span>
                        <div className="grid grid-cols-3 gap-2">
                          {columns.slice(0, 3).map((col) => {
                            const seat = seatMap.find(
                              (s) => s.row === row && s.column === col
                            );
                            const seatId = `${row}${col}`;
                            const isSelected = selectedSeats.includes(seatId);

                            return (
                              <button
                                key={col}
                                onClick={() => seat && handleSeatClick(seat)}
                                disabled={seat?.status === 'occupied'}
                                className={`w-10 h-10 rounded transition-all ${
                                  isSelected
                                    ? 'bg-[#1A73E8] text-white'
                                    : seat?.status === 'occupied'
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : seat?.status === 'premium'
                                    ? 'bg-[#FF7A00] hover:bg-[#FF7A00]/80 text-white'
                                    : 'bg-[#20C997] hover:bg-[#20C997]/80 text-white'
                                }`}
                              >
                                {col}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {columns.slice(3).map((col) => {
                          const seat = seatMap.find((s) => s.row === row && s.column === col);
                          const seatId = `${row}${col}`;
                          const isSelected = selectedSeats.includes(seatId);

                          return (
                            <button
                              key={col}
                              onClick={() => seat && handleSeatClick(seat)}
                              disabled={seat?.status === 'occupied'}
                              className={`w-10 h-10 rounded transition-all ${
                                isSelected
                                  ? 'bg-[#1A73E8] text-white'
                                  : seat?.status === 'occupied'
                                  ? 'bg-gray-300 cursor-not-allowed'
                                  : seat?.status === 'premium'
                                  ? 'bg-[#FF7A00] hover:bg-[#FF7A00]/80 text-white'
                                  : 'bg-[#20C997] hover:bg-[#20C997]/80 text-white'
                              }`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSeats.length > 0 && (
                  <div className="mt-6 bg-blue-50 border border-[#1A73E8] rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-[#0B2948]">
                          Selected Seats: {selectedSeats.join(', ')}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total Seat Price: ₹{totalSeatPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#0B2948]">Price Summary</h3>
              <p className="text-gray-600">Breakdown of your booking</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-[#333333]">Base Fare</span>
              <span className="font-semibold">₹{selectedFlight.price.toLocaleString()}</span>
            </div>
            {totalSeatPrice > 0 && (
              <div className="flex justify-between">
                <span className="text-[#333333]">Seat Selection</span>
                <span className="font-semibold">₹{totalSeatPrice.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#333333]">Taxes & Fees</span>
              <span className="font-semibold">
                ₹{Math.floor(selectedFlight.price * 0.12).toLocaleString()}
              </span>
            </div>
            <div className="border-t border-[#DDDDDD] pt-3 flex justify-between">
              <span className="text-lg font-bold text-[#0B2948]">Total Amount</span>
              <span className="text-2xl font-bold text-[#1A73E8]">
                ₹
                {(
                  selectedFlight.price +
                  totalSeatPrice +
                  Math.floor(selectedFlight.price * 0.12)
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep('passengers')}
            className="w-full bg-[#1A73E8] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1557B0] transition-colors"
          >
            Continue to Passenger Details
          </button>
        </div>
      </div>
    </div>
  );
};
