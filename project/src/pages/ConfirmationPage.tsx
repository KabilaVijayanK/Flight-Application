import { CheckCircle, Download, Mail, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const ConfirmationPage = () => {
  const { bookings, setCurrentStep, selectedFlight, passengers, selectedSeats } = useBooking();
  const latestBooking = bookings[bookings.length - 1];

  if (!latestBooking || !selectedFlight) return null;

  const handleDownloadTicket = () => {
    alert('Ticket download will start shortly!');
  };

  const handleEmailTicket = () => {
    alert(`Ticket sent to ${passengers[0]?.email}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-[#20C997] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#0B2948] mb-3">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Your flight has been successfully booked
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#DDDDDD]">
            <div>
              <h3 className="text-sm text-gray-600 mb-1">Booking ID</h3>
              <p className="text-2xl font-bold text-[#1A73E8]">{latestBooking.id}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm text-gray-600 mb-1">PNR Number</h3>
              <p className="text-2xl font-bold text-[#0B2948]">{latestBooking.pnr}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#1A73E8] to-[#20C997] rounded-xl p-6 text-white mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-3xl">
                  {selectedFlight.airlineLogo}
                </div>
                <div>
                  <div className="text-lg font-bold">{selectedFlight.airline}</div>
                  <div className="text-blue-100">{selectedFlight.flightNumber}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ₹{latestBooking.totalPrice.toLocaleString()}
                </div>
                <div className="text-blue-100 text-sm">Total Amount</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{selectedFlight.departureTime}</div>
                <div className="text-lg font-semibold">{selectedFlight.from.code}</div>
                <div className="text-sm text-blue-100">{selectedFlight.from.city}</div>
              </div>

              <div className="flex-1 px-6">
                <div className="relative">
                  <div className="h-px bg-white/30 w-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#1A73E8] px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedFlight.duration}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold mb-1">{selectedFlight.arrivalTime}</div>
                <div className="text-lg font-semibold">{selectedFlight.to.code}</div>
                <div className="text-sm text-blue-100">{selectedFlight.to.city}</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#1A73E8]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Departure Date</div>
                  <div className="font-semibold text-[#0B2948]">
                    {new Date(latestBooking.bookingDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#FF7A00]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Flight Duration</div>
                  <div className="font-semibold text-[#0B2948]">{selectedFlight.duration}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#20C997]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Passengers</div>
                  <div className="font-semibold text-[#0B2948]">
                    {passengers.length} Traveler{passengers.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#1A73E8]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Selected Seats</div>
                    <div className="font-semibold text-[#0B2948]">
                      {selectedSeats.join(', ')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-[#DDDDDD] pt-6">
            <h4 className="font-bold text-[#0B2948] mb-4">Passenger Details</h4>
            <div className="space-y-3">
              {passengers.map((passenger, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-[#0B2948]">
                      {passenger.firstName} {passenger.lastName}
                    </div>
                    <div className="text-sm text-gray-600">{passenger.gender}</div>
                  </div>
                  {index === 0 && (
                    <div className="text-sm text-gray-600">
                      {passenger.email} • {passenger.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center gap-2 bg-[#1A73E8] text-white py-4 rounded-xl font-semibold hover:bg-[#1557B0] transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Ticket
          </button>
          <button
            onClick={handleEmailTicket}
            className="flex items-center justify-center gap-2 bg-white text-[#1A73E8] border-2 border-[#1A73E8] py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email Ticket
          </button>
        </div>

        <div className="bg-blue-50 border border-[#1A73E8] rounded-xl p-6 mb-6">
          <h4 className="font-bold text-[#0B2948] mb-3">Important Information</h4>
          <ul className="space-y-2 text-sm text-[#333333]">
            <li className="flex items-start gap-2">
              <span className="text-[#1A73E8] mt-1">•</span>
              Please arrive at the airport at least 2 hours before departure
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1A73E8] mt-1">•</span>
              Carry a valid government-issued photo ID for check-in
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1A73E8] mt-1">•</span>
              Web check-in opens 48 hours before departure
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1A73E8] mt-1">•</span>
              A confirmation email has been sent to {passengers[0]?.email}
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentStep('manage')}
            className="flex-1 bg-white text-[#1A73E8] border-2 border-[#1A73E8] py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            View My Bookings
          </button>
          <button
            onClick={() => setCurrentStep('search')}
            className="flex-1 bg-[#20C997] text-white py-4 rounded-xl font-semibold hover:bg-[#1AB386] transition-colors"
          >
            Book Another Flight
          </button>
        </div>
      </div>
    </div>
  );
};
