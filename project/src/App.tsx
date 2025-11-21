import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { FlightDetailsPage } from './pages/FlightDetailsPage';
import { PassengerDetailsPage } from './pages/PassengerDetailsPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { ManageBookingsPage } from './pages/ManageBookingsPage';

function AppContent() {
  const { currentStep } = useBooking();

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      {currentStep === 'landing' && <LandingPage />}
      {currentStep === 'search' && <HomePage />}
      {currentStep === 'results' && <SearchResultsPage />}
      {currentStep === 'details' && <FlightDetailsPage />}
      {currentStep === 'passengers' && <PassengerDetailsPage />}
      {currentStep === 'payment' && <PaymentPage />}
      {currentStep === 'confirmation' && <ConfirmationPage />}
      {currentStep === 'manage' && <ManageBookingsPage />}
    </div>
  );
}

function App() {
  return (
    <BookingProvider>
      <AppContent />
      <Footer />
    </BookingProvider>
  );
}

export default App;
