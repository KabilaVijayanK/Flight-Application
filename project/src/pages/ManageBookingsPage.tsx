import { useState } from 'react';
import { Calendar, MapPin, Plane, Download, X, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Booking } from '../types';

export const ManageBookingsPage = () => {
  const { bookings, setCurrentStep } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCancelBooking = () => {
    setShowCancelModal(false);
    setSelectedBooking(null);
    alert('Booking cancelled successfully! Refund will be processed in 5-7 business days.');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#0B2948] mb-2">My Bookings</h2>
          <p className="text-gray-600">Manage and view your flight bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-bold text-[#0B2948] mb-3">No Bookings Found</h3>
            <p className="text-gray-600 mb-6">
              You haven't made any flight bookings yet. Start exploring destinations!
            </p>
            <button
              onClick={() => setCurrentStep('search')}
              className="px-8 py-4 bg-[#1A73E8] text-white rounded-lg font-semibold hover:bg-[#1557B0] transition-colors"
            >
              Book Your First Flight
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-[#DDDDDD]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Booking ID</div>
                    <div className="text-xl font-bold text-[#1A73E8]">{booking.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">PNR</div>
                    <div className="text-xl font-bold text-[#0B2948]">{booking.pnr}</div>
                  </div>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-[#20C997] text-white'
                          : booking.status === 'cancelled'
                          ? 'bg-red-500 text-white'
                          : 'bg-[#FF7A00] text-white'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#F5F7FA] rounded-lg flex items-center justify-center text-2xl">
                    {booking.flight.airlineLogo}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2948]">{booking.flight.airline}</div>
                    <div className="text-sm text-gray-600">{booking.flight.flightNumber}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-[#0B2948] mb-1">
                      {booking.flight.departureTime}
                    </div>
                    <div className="font-semibold text-gray-700">{booking.flight.from.code}</div>
                    <div className="text-sm text-gray-600">{booking.flight.from.city}</div>
                  </div>

                  <div className="flex-1 px-8">
                    <div className="relative">
                      <div className="h-px bg-[#DDDDDD] w-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                        <Plane className="w-5 h-5 text-[#1A73E8]" />
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-600 mt-2">
                      {booking.flight.duration}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0B2948] mb-1">
                      {booking.flight.arrivalTime}
                    </div>
                    <div className="font-semibold text-gray-700">{booking.flight.to.code}</div>
                    <div className="text-sm text-gray-600">{booking.flight.to.city}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.passengers.length} Passenger(s)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#DDDDDD]">
                  <div className="text-2xl font-bold text-[#1A73E8]">
                    ₹{booking.totalPrice.toLocaleString()}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="px-6 py-2 bg-[#1A73E8] text-white rounded-lg font-semibold hover:bg-[#1557B0] transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => alert('Ticket download started!')}
                      className="px-6 py-2 border-2 border-[#1A73E8] text-[#1A73E8] rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowCancelModal(true);
                        }}
                        className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedBooking && !showCancelModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#0B2948]">Booking Details</h3>
                <button onClick={() => setSelectedBooking(null)}>
                  <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-[#F5F7FA] rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Booking ID</div>
                      <div className="font-bold text-[#0B2948]">{selectedBooking.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">PNR Number</div>
                      <div className="font-bold text-[#0B2948]">{selectedBooking.pnr}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Booking Date</div>
                      <div className="font-bold text-[#0B2948]">
                        {new Date(selectedBooking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Status</div>
                      <div className="font-bold text-[#0B2948]">
                        {selectedBooking.status.charAt(0).toUpperCase() +
                          selectedBooking.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2948] mb-3">Passengers</h4>
                  <div className="space-y-2">
                    {selectedBooking.passengers.map((passenger, index) => (
                      <div key={index} className="bg-[#F5F7FA] rounded-lg p-4">
                        <div className="font-semibold text-[#0B2948]">
                          {passenger.firstName} {passenger.lastName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {passenger.gender} • Born: {passenger.dateOfBirth}
                        </div>
                        {index === 0 && (
                          <div className="text-sm text-gray-600 mt-2">
                            {passenger.email} • {passenger.phone}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-[#1A73E8] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#0B2948]">Total Amount Paid</span>
                    <span className="text-2xl font-bold text-[#1A73E8]">
                      ₹{selectedBooking.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCancelModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2948]">Cancel Booking?</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel this booking? A cancellation fee of ₹2,000 will be
                deducted from your refund.
              </p>

              <div className="bg-[#F5F7FA] rounded-lg p-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Original Amount</span>
                  <span className="font-semibold">₹{selectedBooking.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Cancellation Fee</span>
                  <span className="font-semibold text-red-500">- ₹2,000</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                  <span className="font-bold text-[#0B2948]">Refund Amount</span>
                  <span className="font-bold text-[#20C997]">
                    ₹{(selectedBooking.totalPrice - 2000).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-3 border-2 border-[#DDDDDD] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
