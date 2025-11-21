import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-lg shadow-md">
              <Plane className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <div className="text-lg font-black">TheBotBook</div>
              <div className="text-sm text-slate-300">Travel smarter, fly better</div>
            </div>
          </div>

          <div className="flex gap-8 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="text-sm text-slate-300">
            © {new Date().getFullYear()} TheBotBook. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
