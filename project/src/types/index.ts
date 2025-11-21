export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface SearchParams {
  from: Airport | null;
  to: Airport | null;
  departureDate: string;
  returnDate: string | null;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  travelClass: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
  tripType: 'one-way' | 'round-trip';
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string[];
  price: number;
  seats: number;
  badge?: 'cheapest' | 'fastest' | 'best';
}

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  email: string;
  phone: string;
  passportNumber?: string;
}

export interface Booking {
  id: string;
  pnr: string;
  flight: Flight;
  passengers: PassengerDetails[];
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

export interface SeatMapSeat {
  row: number;
  column: string;
  status: 'available' | 'occupied' | 'premium' | 'selected';
  price?: number;
}
