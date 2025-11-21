import { createContext, useContext, useState, ReactNode } from 'react';
import { SearchParams, Flight, PassengerDetails, Booking, Airport } from '../types';

interface BookingContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
  passengers: PassengerDetails[];
  setPassengers: (passengers: PassengerDetails[]) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  currentStep: 'landing' | 'search' | 'results' | 'details' | 'passengers' | 'payment' | 'confirmation' | 'manage';
  setCurrentStep: (step: 'landing' | 'search' | 'results' | 'details' | 'passengers' | 'payment' | 'confirmation' | 'manage') => void;
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  filters: {
    stops: number[];
    priceRange: [number, number];
    airlines: string[];
    departureTime: string[];
  };
  setFilters: (filters: any) => void;
  sortBy: 'price' | 'duration' | 'departure';
  setSortBy: (sort: 'price' | 'duration' | 'departure') => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: null,
    to: null,
    departureDate: '',
    returnDate: null,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    travelClass: 'Economy',
    tripType: 'one-way',
  });

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState<PassengerDetails[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentStep, setCurrentStep] = useState<'landing' | 'search' | 'results' | 'details' | 'passengers' | 'payment' | 'confirmation' | 'manage'>('landing');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    stops: [],
    priceRange: [0, 50000] as [number, number],
    airlines: [],
    departureTime: [],
  });
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        setSearchParams,
        selectedFlight,
        setSelectedFlight,
        passengers,
        setPassengers,
        bookings,
        addBooking,
        currentStep,
        setCurrentStep,
        selectedSeats,
        setSelectedSeats,
        filters,
        setFilters,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};
