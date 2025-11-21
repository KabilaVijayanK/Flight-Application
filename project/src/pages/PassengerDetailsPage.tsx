import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { PassengerDetails } from '../types';

export const PassengerDetailsPage = () => {
  const { selectedFlight, searchParams, setCurrentStep, setPassengers } = useBooking();
  const [formData, setFormData] = useState<PassengerDetails[]>([
    {
      firstName: '',
      lastName: '',
      gender: 'Male',
      dateOfBirth: '',
      email: '',
      phone: '',
    },
  ]);

  if (!selectedFlight) return null;

  const totalPassengers =
    searchParams.passengers.adults +
    searchParams.passengers.children +
    searchParams.passengers.infants;

  const handleInputChange = (index: number, field: keyof PassengerDetails, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [field]: value };
    setFormData(newFormData);
  };

  const addPassenger = () => {
    if (formData.length < totalPassengers) {
      setFormData([
        ...formData,
        {
          firstName: '',
          lastName: '',
          gender: 'Male',
          dateOfBirth: '',
          email: '',
          phone: '',
        },
      ]);
    }
  };

  const handleContinue = () => {
    const isValid = formData.every(
      (passenger) =>
        passenger.firstName &&
        passenger.lastName &&
        passenger.dateOfBirth &&
        passenger.email &&
        passenger.phone
    );

    if (isValid) {
      setPassengers(formData);
      setCurrentStep('payment');
    } else {
      alert('Please fill in all required fields for all passengers');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
     
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setCurrentStep('details')}
            className="flex items-center gap-2 text-[#1A73E8] hover:text-[#1557B0] font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
           Back to Flight Details 
          </button>
        </div>
      

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#0B2948] mb-2">Passenger Details</h2>
          <p className="text-gray-600">Please provide information for all travelers</p>
        </div>

        <div className="space-y-6">
          {formData.map((passenger, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#1A73E8] rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-[#0B2948]">
                  Passenger {index + 1}
                  {index === 0 && ' (Primary Contact)'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                      placeholder="Enter first name"
                      className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                      placeholder="Enter last name"
                      className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={passenger.gender}
                    onChange={(e) =>
                      handleInputChange(index, 'gender', e.target.value as any)
                    }
                    className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
                    />
                  </div>
                </div>

                {index === 0 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={passenger.email}
                          onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={passenger.phone}
                          onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-black"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {formData.length < totalPassengers && (
            <button
              onClick={addPassenger}
              className="w-full py-4 border-2 border-dashed border-[#1A73E8] rounded-xl text-[#1A73E8] font-semibold hover:bg-blue-50 transition-colors"
            >
              + Add Another Passenger ({formData.length}/{totalPassengers})
            </button>
          )}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <input type="checkbox" id="terms" className="w-5 h-5 text-[#1A73E8] rounded" />
            <label htmlFor="terms" className="text-sm text-[#333333]">
              I agree to the{' '}
              <span className="text-[#1A73E8] font-semibold cursor-pointer">
                Terms & Conditions
              </span>{' '}
              and{' '}
              <span className="text-[#1A73E8] font-semibold cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-[#1A73E8] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1557B0] transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};
