import { SearchForm } from '../components/SearchForm';
import { popularDestinations } from '../data/mockData';
import { MapPin, TrendingUp, Shield, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { airports } from '../data/mockData';

export const HomePage = () => {
  const { setSearchParams, searchParams, setCurrentStep } = useBooking();

  const handleDestinationClick = (code: string) => {
    const destination = airports.find((a) => a.code === code);
    if (destination) {
      setSearchParams({
        ...searchParams,
        to: destination,
        departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div
        className="relative bg-gradient-to-br from-[#1A73E8] to-[#0B2948] text-white py-20"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A73E8]/90 to-[#0B2948]/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Search, compare, and book flights to destinations worldwide
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </div>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-[#1A73E8]" />
            </div>
            <h3 className="font-semibold text-[#0B2948] mb-2">Best Prices</h3>
            <p className="text-sm text-gray-600">
              Compare and find the lowest fares from multiple airlines
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-[#20C997]" />
            </div>
            <h3 className="font-semibold text-[#0B2948] mb-2">Secure Booking</h3>
            <p className="text-sm text-gray-600">
              Safe and secure payment with multiple options
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-[#FF7A00]" />
            </div>
            <h3 className="font-semibold text-[#0B2948] mb-2">Quick Booking</h3>
            <p className="text-sm text-gray-600">
              Book your flight in less than 5 minutes
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-[#1A73E8]" />
            </div>
            <h3 className="font-semibold text-[#0B2948] mb-2">Wide Coverage</h3>
            <p className="text-sm text-gray-600">
              Access to thousands of destinations worldwide
            </p>
          </div>
        </div>
        

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#0B2948] mb-2">Popular Destinations</h2>
          <p className="text-gray-600">Discover amazing places around the world</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((destination) => (
            <div
              key={destination.code}
              onClick={() => handleDestinationClick(destination.code)}
              className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={destination.image}
                alt={destination.city}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destination.city}</h3>
                <p className="text-sm text-blue-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {destination.code}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1A73E8] to-[#20C997] rounded-2xl p-8 md:p-12 text-black text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg md:text-xl mb-6 text-blue-50">
            Join thousands of travelers who trust us for their flight bookings
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-[#1A73E8] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Start Booking Now
          </button>
        </div>
      </div>
    </div>
     
  );
};
