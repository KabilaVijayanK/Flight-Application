import { useState, useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { FlightCard } from '../components/FlightCard';
import { generateMockFlights } from '../data/mockData';

export const SearchResultsPage = () => {
  const { searchParams, setCurrentStep, filters, setFilters, sortBy, setSortBy } = useBooking();
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const flights = useMemo(() => {
    if (!searchParams.from || !searchParams.to) return [];
    return generateMockFlights(searchParams.from, searchParams.to);
  }, [searchParams.from, searchParams.to]);

  const filteredFlights = useMemo(() => {
    let result = [...flights];

    if (filters.stops.length > 0) {
      result = result.filter((f) => filters.stops.includes(f.stops));
    }

    result = result.filter(
      (f) => f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1]
    );

    if (filters.airlines.length > 0) {
      result = result.filter((f) => filters.airlines.includes(f.airline));
    }

    switch (sortBy) {
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'departure':
        result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
    }

    return result;
  }, [flights, filters, sortBy]);

  const maxPrice = Math.max(...flights.map((f) => f.price));
  const airlines = [...new Set(flights.map((f) => f.airline))];

  const handleStopFilter = (stops: number) => {
    const newStops = filters.stops.includes(stops)
      ? filters.stops.filter((s) => s !== stops)
      : [...filters.stops, stops];
    setFilters({ ...filters, stops: newStops });
  };

  const handleAirlineFilter = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    setFilters({ ...filters, airlines: newAirlines });
  };

  const clearFilters = () => {
    setFilters({
      stops: [],
      priceRange: [0, maxPrice],
      airlines: [],
      departureTime: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep('search')}
              className="flex items-center gap-2 text-[#1A73E8] hover:text-[#1557B0] font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Modify Search
            </button>
            <div className="text-sm text-gray-600 hover:text-[#1A73E8] transition-colors">
              {searchParams.from?.city} → {searchParams.to?.city} •{' '}
              {new Date(searchParams.departureDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-4 py-2 border border-[#DDDDDD] rounded-lg hover:bg-[#F5F7FA] transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-[#DDDDDD] rounded-lg hover:bg-[#F5F7FA] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSort && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#0B2948]">Sort By</h3>
              <button onClick={() => setShowSort(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { value: 'price', label: 'Price: Low to High' },
                { value: 'duration', label: 'Duration: Shortest First' },
                { value: 'departure', label: 'Departure Time: Earliest First' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value as any);
                    setShowSort(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    sortBy === option.value
                      ? 'bg-[#1A73E8] text-white'
                      : 'bg-[#F5F7FA] text-[#333333] hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#0B2948]">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#333333] mb-3">Number of Stops</h4>
                <div className="space-y-2">
                  {[
                    { value: 0, label: 'Non-stop' },
                    { value: 1, label: '1 Stop' },
                    { value: 2, label: '2+ Stops' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.stops.includes(option.value)}
                        onChange={() => handleStopFilter(option.value)}
                        className="w-5 h-5 text-[#1A73E8] rounded focus:ring-[#1A73E8]"
                      />
                      <span className="text-[#333333]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#333333] mb-3">
                  Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                </h4>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: [0, parseInt(e.target.value)],
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1A73E8]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-[#333333] mb-3">Airlines</h4>
                <div className="space-y-2">
                  {airlines.map((airline) => (
                    <label key={airline} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.airlines.includes(airline)}
                        onChange={() => handleAirlineFilter(airline)}
                        className="w-5 h-5 text-[#1A73E8] rounded focus:ring-[#1A73E8]"
                      />
                      <span className="text-[#333333]">{airline}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 border border-[#DDDDDD] rounded-lg font-semibold hover:bg-[#F5F7FA] transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-3 bg-[#1A73E8] text-white rounded-lg font-semibold hover:bg-[#1557B0] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0B2948] mb-2">
            {filteredFlights.length} Flights Found
          </h2>
          <p className="text-gray-600">
            {searchParams.from?.city} to {searchParams.to?.city}
          </p>
        </div>

        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>

        {filteredFlights.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-[#0B2948] mb-2">No flights found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-[#1A73E8] text-white rounded-lg font-semibold hover:bg-[#1557B0] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
