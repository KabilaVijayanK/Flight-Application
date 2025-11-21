import { Airport, Flight } from '../types';

export const airports: Airport[] = [
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', country: 'India' },
  { code: 'GOI', name: 'Goa International Airport', city: 'Goa', country: 'India' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
];

export const airlines = [
  { name: 'Air India', logo: '🇮🇳' },
  { name: 'IndiGo', logo: '✈️' },
  { name: 'Vistara', logo: '🦚' },
  { name: 'SpiceJet', logo: '🌶️' },
  { name: 'Emirates', logo: '🦅' },
  { name: 'Singapore Airlines', logo: '🦁' },
  { name: 'British Airways', logo: '🇬🇧' },
  { name: 'Lufthansa', logo: '🇩🇪' },
];

export const generateMockFlights = (from: Airport, to: Airport): Flight[] => {
  const flights: Flight[] = [];
  const basePrice = Math.floor(Math.random() * 5000) + 3000;

  for (let i = 0; i < 15; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const stops = Math.random() > 0.6 ? 0 : Math.random() > 0.5 ? 1 : 2;
    const departureHour = 6 + Math.floor(Math.random() * 16);
    const durationHours = 2 + stops * 2 + Math.floor(Math.random() * 4);
    const arrivalHour = (departureHour + durationHours) % 24;

    const price = basePrice + Math.floor(Math.random() * 3000) + (stops * 500);

    flights.push({
      id: `FL${1000 + i}`,
      airline: airline.name,
      airlineLogo: airline.logo,
      flightNumber: `${airline.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
      from,
      to,
      departureTime: `${departureHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      duration: `${durationHours}h ${Math.floor(Math.random() * 60)}m`,
      stops,
      stopDetails: stops > 0 ? ['Via Dubai', 'Via Singapore'].slice(0, stops) : undefined,
      price,
      seats: Math.floor(Math.random() * 50) + 10,
    });
  }

  const sortedFlights = [...flights].sort((a, b) => a.price - b.price);
  sortedFlights[0].badge = 'cheapest';

  const fastestFlight = [...flights].sort((a, b) =>
    parseInt(a.duration) - parseInt(b.duration)
  )[0];
  fastestFlight.badge = 'fastest';

  return flights;
};

export const popularDestinations = [
  { city: 'Dubai', code: 'DXB', image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { city: 'Singapore', code: 'SIN', image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { city: 'London', code: 'LHR', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { city: 'New York', code: 'JFK', image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { city: 'Paris', code: 'CDG', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { city: 'Goa', code: 'GOI', image: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=600' },
];
