import { Plane, User, Menu } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Navbar = () => {
  const { setCurrentStep } = useBooking();

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentStep('search')}
          >
            <div className="w-10 h-10 bg-[#1A73E8] rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#FFFFFF]">TheBotBook</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentStep('search')}
              className="text-#FFFFFF] hover:text-[#1A73E8] font-medium transition-colors"
            >
              Book Flights
            </button>
            <button
              onClick={() => setCurrentStep('manage')}
              className="text-[#FFFFFF] hover:text-[#1A73E8] font-medium transition-colors"
            >
              My Bookings
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 text-[#FFFFFF] hover:text-[#1A73E8] transition-colors">
              <User className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </button>
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-[#333333]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
