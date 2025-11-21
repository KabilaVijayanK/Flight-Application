import { useState } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { airports } from '../data/mockData';
import { Airport } from '../types';

export const SearchForm = () => {
  const { searchParams, setSearchParams, setCurrentStep } = useBooking();
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');

  const filteredFromAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(fromSearch.toLowerCase()) ||
      airport.code.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredToAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(toSearch.toLowerCase()) ||
      airport.code.toLowerCase().includes(toSearch.toLowerCase())
  );

  const totalPassengers =
    searchParams.passengers.adults +
    searchParams.passengers.children +
    searchParams.passengers.infants;

  const handleSearch = () => {
    if (searchParams.from && searchParams.to && searchParams.departureDate) {
      setCurrentStep('results');
    }
  };

  const handleFromSelect = (airport: Airport) => {
    setSearchParams({ ...searchParams, from: airport });
    setFromSearch(airport.city);
    setShowFromSuggestions(false);
  };

  const handleToSelect = (airport: Airport) => {
    setSearchParams({ ...searchParams, to: airport });
    setToSearch(airport.city);
    setShowToSuggestions(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSearchParams({ ...searchParams, tripType: 'one-way' })}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            searchParams.tripType === 'one-way'
              ? 'bg-[#1A73E8] text-white'
              : 'bg-gray-100 text-[#333333] hover:bg-gray-200'
          }`}
        >
          One Way
        </button>
        <button
          onClick={() => setSearchParams({ ...searchParams, tripType: 'round-trip' })}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            searchParams.tripType === 'round-trip'
              ? 'bg-[#1A73E8] text-white'
              : 'bg-gray-100 text-[#333333] hover:bg-gray-200'
          }`}
        >
          Round Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-[#333333] mb-2">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Departure City"
              value={searchParams.from?.city || fromSearch}
              onChange={(e) => {
                setFromSearch(e.target.value);
                setShowFromSuggestions(true);
              }}
              onFocus={() => setShowFromSuggestions(true)}
              className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
            />
          </div>
          {showFromSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DDDDDD] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {filteredFromAirports.map((airport) => (
                <div
                  key={airport.code}
                  onClick={() => handleFromSelect(airport)}
                  className="p-3 hover:bg-[#F5F7FA] cursor-pointer"
                >
                  <div className="font-medium text-[#333333]">{airport.city}</div>
                  <div className="text-sm text-gray-500">
                    {airport.code} - {airport.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-[#333333] mb-2">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Arrival City"
              value={searchParams.to?.city || toSearch}
              onChange={(e) => {
                setToSearch(e.target.value);
                setShowToSuggestions(true);
              }}
              onFocus={() => setShowToSuggestions(true)}
              className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
            />
          </div>
          {showToSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DDDDDD] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {filteredToAirports.map((airport) => (
                <div
                  key={airport.code}
                  onClick={() => handleToSelect(airport)}
                  className="p-3 hover:bg-[#F5F7FA] cursor-pointer"
                >
                  <div className="font-medium text-[#333333]">{airport.city}</div>
                  <div className="text-sm text-gray-500">
                    {airport.code} - {airport.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={searchParams.departureDate}
              onChange={(e) =>
                setSearchParams({ ...searchParams, departureDate: e.target.value })
              }
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
            />
          </div>
        </div>

        {searchParams.tripType === 'round-trip' && (
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchParams.returnDate || ''}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, returnDate: e.target.value })
                }
                min={searchParams.departureDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="relative">
          <label className="block text-sm font-medium text-[#333333] mb-2">Passengers</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              onClick={() => setShowPassengers(!showPassengers)}
              className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
            >
              {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
            </button>
          </div>
          {showPassengers && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DDDDDD] rounded-lg shadow-lg p-4 z-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#333333]">Adults</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          passengers: {
                            ...searchParams.passengers,
                            adults: Math.max(1, searchParams.passengers.adults - 1),
                          },
                        })
                      }
                     className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"

                    >
                      -
                    </button>
                    <span className="w-8 text-center text-black">{searchParams.passengers.adults}</span>
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          passengers: {
                            ...searchParams.passengers,
                            adults: searchParams.passengers.adults + 1,
                          },
                        })
                      }
                      className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"

                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#333333]">Children (2-12)</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          passengers: {
                            ...searchParams.passengers,
                            children: Math.max(0, searchParams.passengers.children - 1),
                          },
                        })
                      }
                    className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"

                    >
                      -
                    </button>
                    <span className="w-8 text-center text-black">{searchParams.passengers.children}</span>
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          passengers: {
                            ...searchParams.passengers,
                            children: searchParams.passengers.children + 1,
                          },
                        })
                      }
                     className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"

                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#333333]">Infants (0-2)</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          passengers: {
                            ...searchParams.passengers,
                            infants: Math.max(0, searchParams.passengers.infants - 1),
                          },
                        })
                      }
                    className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"

                    >
                      -
                    </button>
                    <span className="w-8 text-center text-black">{searchParams.passengers.infants}</span>
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          passengers: {
                            ...searchParams.passengers,
                            infants: searchParams.passengers.infants + 1,
                          },
                        })
                      }
                      className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"

                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Class</label>
          <select
            value={searchParams.travelClass}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                travelClass: e.target.value as any,
              })
            }
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
          >
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full mt-6 bg-[#1A73E8] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1557B0] transition-colors flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        Search Flights
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
