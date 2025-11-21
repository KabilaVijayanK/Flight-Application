import { Clock, Plane } from 'lucide-react';
import { Flight } from '../types';
import { useBooking } from '../context/BookingContext';

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
  const { setSelectedFlight, setCurrentStep } = useBooking();

  const handleBookClick = () => {
    setSelectedFlight(flight);
    setCurrentStep('details');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-[#DDDDDD]">
      {flight.badge && (
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            flight.badge === 'cheapest'
              ? 'bg-[#FF7A00] text-white'
              : flight.badge === 'fastest'
              ? 'bg-[#20C997] text-white'
              : 'bg-[#1A73E8] text-white'
          }`}
        >
          {flight.badge === 'cheapest'
            ? 'Cheapest'
            : flight.badge === 'fastest'
            ? 'Fastest'
            : 'Best Value'}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F5F7FA] rounded-lg flex items-center justify-center text-2xl">
            {flight.airlineLogo}
          </div>
          <div>
            <div className="font-semibold text-[#333333]">{flight.airline}</div>
            <div className="text-sm text-gray-500">{flight.flightNumber}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#1A73E8]">
            ₹{flight.price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">{flight.seats} seats left</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#0B2948]">{flight.departureTime}</div>
          <div className="text-sm text-gray-600">{flight.from.code}</div>
          <div className="text-xs text-gray-500">{flight.from.city}</div>
        </div>

        <div className="flex-1 px-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex-1 h-px bg-[#DDDDDD]"></div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{flight.duration}</span>
            </div>
            <div className="flex-1 h-px bg-[#DDDDDD]"></div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">
              {flight.stops === 0 ? (
                <span className="text-[#20C997] font-medium">Non-stop</span>
              ) : (
                <span className="text-[#FF7A00]">
                  {flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}
                </span>
              )}
            </div>
            {flight.stopDetails && (
              <div className="text-xs text-gray-400 mt-1">
                {flight.stopDetails.join(', ')}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-[#0B2948]">{flight.arrivalTime}</div>
          <div className="text-sm text-gray-600">{flight.to.code}</div>
          <div className="text-xs text-gray-500">{flight.to.city}</div>
        </div>
      </div>

      <button
        onClick={handleBookClick}
        className="w-full bg-[#1A73E8] text-white py-3 rounded-lg font-semibold hover:bg-[#1557B0] transition-colors flex items-center justify-center gap-2"
      >
        <Plane className="w-4 h-4" />
        View Details & Book
      </button>
    </div>
  );
};
