import { useState, useEffect } from 'react';
import { 
  Search, Globe, Shield, Clock, MapPin, Plane, Star, ChevronDown, ArrowRight, 
  Sparkles, Users, CreditCard, Headphones 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { airports } from '../data/mockData';

const Cloud = (props: any) => {
  const { className, style } = props;
  return (
    <div className={`absolute text-white/30 ${className}`} style={style}>
      <svg width="120" height="60" viewBox="0 0 120 60" fill="currentColor">
        <ellipse cx="50" cy="35" rx="35" ry="20" />
        <ellipse cx="80" cy="40" rx="25" ry="15" />
        <ellipse cx="30" cy="40" rx="20" ry="12" />
      </svg>
    </div>
  );
};

const FloatingParticle = (props: any) => {
  const { delay, duration, size, left, top } = props;
  return (
    <div
      className="absolute rounded-full bg-blue-400/20 animate-pulse"
      style={{
        width: size, height: size, left: `${left}%`, top: `${top}%`,
        animationDelay: `${delay}s`, animationDuration: `${duration}s`
      }}
    />
  );
};

const PlaneIllustration = () => {
  const [hover, setHover] = useState(false);
  
  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      {/* Background planes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[0,1,2].map((i) => (
          <svg
            key={i}
            viewBox="0 0 64 24"
            fill="none"
            className="plane-svg absolute text-slate-300"
            style={{
              width: 120,
              height: 44,
              top: `${20 + i * 18}px`,
              left: `${-180 - i * 120}px`,
              opacity: 0.9,
              animation: `planeLoop ${8 + i * 3}s linear ${i * 0.6}s infinite`
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor">
              <path d="M2 12 C8 6, 24 6, 34 8 C44 10, 58 12, 62 12 C58 12, 50 14, 40 14 C30 14, 14 14, 6 12 Z" opacity="0.95" />
              <path d="M36 6 L44 2 L48 6 L40 8 Z" opacity="0.95" />
            </g>
          </svg>
        ))}
      </div>

      {/* Glowing orb */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute w-[350px] h-[350px] rounded-full border border-blue-200/30 animate-spin" style={{ animationDuration: '30s' }} />
      <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-blue-300/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      
      {/* Main plane */}
      <div
        className="relative z-10 transition-transform duration-500"
        style={{ transform: hover ? 'translateY(-20px) rotate(-5deg)' : 'translateY(0)' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="absolute top-1/2 right-full -translate-y-1/2 flex flex-col gap-1 pr-3">
            {[0,1,2].map(i => (
              <div key={i} className="h-1 bg-gradient-to-l from-white/60 to-transparent rounded-full animate-pulse"
                style={{ width: `${60 - i * 15}px`, animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          
          <svg width="280" height="160" viewBox="0 0 240 140" className="drop-shadow-2xl filter">
            <defs>
              <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E8F4FF" />
              </linearGradient>
              <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <path d="M40 85 L10 60 L30 60 L55 82 Z" fill="url(#wing)" filter="url(#glow)" />
            <path d="M20 80 C20 60 180 60 220 85 C240 100 220 110 200 110 H40 C25 110 20 100 20 80 Z" fill="url(#body)" />
            <path d="M90 90 L150 130 L170 130 L130 85 Z" fill="url(#wing)" filter="url(#glow)" />
            {[60,80,100,120,140].map((cx,i) => (
              <circle key={i} cx={cx} cy="85" r="4" fill="#3B82F6" opacity="0.7" />
            ))}
            <path d="M200 85 Q218 85 222 95" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Flight card */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/60 w-56 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Next Flight</p>
            <p className="text-lg font-bold text-gray-900">BOM → DXB</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Plane className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="font-semibold text-gray-900">08:45</span>
          <span className="text-gray-400">• 3h 35m</span>
        </div>
        <button className="mt-3 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all">
          View Details
        </button>
      </div>

      {/* Destination pin */}
      <div className="absolute top-8 right-8 bg-white p-3 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '2.5s' }}>
        <MapPin className="w-6 h-6 text-rose-500" />
      </div>
    </div>
  );
};

const SearchButton = () => {
  const { setSearchParams, setCurrentStep } = useBooking();

  const handleClick = (e: React.MouseEvent) => {
    // prevent parent click handlers from accidentally overriding navigation
    e.stopPropagation();
    e.preventDefault();

    const from = airports.find(a => a.code === 'BOM') || airports[0];
    const to = airports.find(a => a.code === 'DXB') || airports[1] || airports[0];
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 7);

    setSearchParams({
      from,
      to,
      departureDate: departureDate.toISOString().split('T')[0],
      returnDate: null,
      passengers: { adults: 1, children: 0, infants: 0 },
      travelClass: 'Economy',
      tripType: 'one-way',
    });

    // navigate to the Home page (search view)
    setCurrentStep('search');
  };

  return (
    <button onClick={handleClick} className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all flex items-center gap-3">
      <Search className="w-5 h-5" />
      Search Flights
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

const FeatureCard = (props: any) => {
  const { icon: Icon, title, desc, gradient } = props;
  return (
    <div className="group relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
};

const TestimonialCard = (props: any) => {
  const { name, role, text, avatar } = props;
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {avatar}
        </div>
        <div>
          <div className="font-bold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{text}"</p>
      <div className="flex gap-1 mt-3">
        {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const { setCurrentStep } = useBooking();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '500+', label: 'Airlines', icon: Globe },
    { value: '50M+', label: 'Travelers', icon: Users },
    { value: '99.9%', label: 'Uptime', icon: Shield },
  ];

  const features = [
    { icon: Search, title: 'Smart Search', desc: 'AI-powered search finds the best deals instantly', gradient: 'from-blue-500 to-cyan-500' },
    { icon: CreditCard, title: 'Secure Payments', desc: 'Bank-grade encryption protects every transaction', gradient: 'from-green-500 to-emerald-500' },
    { icon: Clock, title: 'Real-time Updates', desc: 'Live flight status and instant notifications', gradient: 'from-orange-500 to-amber-500' },
    { icon: Headphones, title: '24/7 Support', desc: 'Expert help whenever you need it', gradient: 'from-purple-500 to-pink-500' },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Business Traveler", text: "The smoothest booking experience I've ever had. Saved hours on my monthly trips!", avatar: "S" },
    { name: "Ravi Patel", role: "Frequent Flyer", text: "Best prices guaranteed. I've compared everywhere and TheBotBook always wins.", avatar: "R" },
    { name: "Maria Santos", role: "Family Traveler", text: "Managing bookings for my family of 5 has never been easier. Love the app!", avatar: "M" },
  ];

  const faqs = [
    { q: 'How do I change my booking?', a: 'Navigate to Manage Booking, enter your reference number, and you can modify dates, seats, or passenger details.' },
    { q: 'What is your refund policy?', a: 'Refunds depend on fare type. Flexible fares offer full refunds, while basic fares may have restrictions. Check your booking for details.' },
    { q: 'How can I contact support?', a: 'Use our 24/7 live chat, email support@thebotbook.com, or call our hotline. Average response time is under 2 minutes.' },
  ];

  // Different animation variants for each section
  const heroVariants: any = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const featuresVariants: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const featureItemVariants: any = {
    hidden: { opacity: 0, y: 30, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5 } }
  };

  const testimonialsVariants: any = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, staggerChildren: 0.15 } }
  };

  const testimonialItemVariants: any = {
    hidden: { opacity: 0, scale: 0.5, rotate: 10 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
  };

  const faqVariants: any = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } }
  };

  const faqItemVariants: any = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Clouds & Planes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * -0.05}px)` }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl" />
        <Cloud className="top-20" style={{ left: `${(scrollY * 0.02) % 100}%` }} />
        <Cloud className="top-40" style={{ left: `${70 - (scrollY * 0.015) % 100}%` }} />
        {[...Array(6)].map((_,i) => (
          <FloatingParticle key={i} delay={i*0.5} duration={3+i} size={4+i*2} left={10+i*15} top={20+i*10} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero - Slides in from left */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={heroVariants}
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-100 rounded-full px-4 py-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                #1 Travel Booking Platform
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              Explore the
              <span className="block bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                world with ease
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Experience seamless travel booking with real-time updates, unbeatable prices, and world-class support.
            </p>

            <div className="flex flex-wrap gap-4">
              <SearchButton />
              <button onClick={() => setCurrentStep('manage')} className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-900 rounded-2xl font-bold text-lg hover:border-blue-400 hover:bg-white transition-all flex items-center gap-3">
                <Search className="w-5 h-5" />
                Manage Booking
              </button>
            </div>

            <div className="flex gap-8 pt-8 border-t border-gray-200/50">
              {stats.map((s,i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <s.icon className="w-5 h-5 text-blue-500" />
                    <span className="text-2xl font-black text-gray-900">{s.value}</span>
                  </div>
                  <span className="text-sm text-gray-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <PlaneIllustration />
        </motion.div>

        {/* Features - Scales up with rotation */}
        <motion.section
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={featuresVariants}
        >
          <motion.div className="text-center mb-12" variants={featureItemVariants}>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why choose us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need for a perfect journey, all in one place.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f,i) => (
              <motion.div key={i} variants={featureItemVariants}>
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials - Slides in from right with bounce */}
        <motion.section
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={testimonialsVariants}
        >
          <motion.h2 
            className="text-4xl font-black text-gray-900 text-center mb-12"
            variants={testimonialItemVariants}
          >
            Loved by travelers
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t,i) => (
              <motion.div key={i} variants={testimonialItemVariants}>
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ - Rises from bottom with stagger */}
        <motion.section
          className="py-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={faqVariants}
        >
          <motion.h2 
            className="text-4xl font-black text-gray-900 text-center mb-12"
            variants={faqItemVariants}
          >
            Common questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((f,i) => (
              <motion.div 
                key={i} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                variants={faqItemVariants}
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left">
                  <span className="font-bold text-gray-900">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-gray-600">{f.a}</div>}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <style>{`
        @keyframes flyAcross {
          0% { transform: translateX(-120%) translateY(0) rotate(-6deg); }
          50% { transform: translateX(50%) translateY(-18px) rotate(0deg); }
          100% { transform: translateX(220%) translateY(0) rotate(6deg); }
        }
        @keyframes planeLoop {
          0% { transform: translateX(0) translateY(0) rotate(-6deg); }
          50% { transform: translateX(220%) translateY(-10px) rotate(0deg); }
          100% { transform: translateX(440%) translateY(0) rotate(6deg); }
        }
        .plane-svg { will-change: transform; }
      `}</style>
    </div>
  );
}