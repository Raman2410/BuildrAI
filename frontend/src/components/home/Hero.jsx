import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Play, Star } from 'lucide-react';

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white selection:bg-purple-500 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-700/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-pink-700/20 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-xl font-bold text-white">B</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              BuildrAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#cta" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/app?state=login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/app?state=register"
                  className="px-5 py-2.5 text-sm font-medium bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-all shadow-lg shadow-white/10"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                to="/app"
                className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-lg font-medium animate-in fade-in duration-200">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
          >
            <X className="size-8" />
          </button>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white">Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white">Features</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white">Testimonials</a>
          <Link
            to={user ? '/app' : '/app?state=register'}
            onClick={() => setMenuOpen(false)}
            className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold"
          >
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            AI-Powered Career Builder 2.0 is live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Craft Your Career with <br />
            <span className="text-gradient">Intelligent Design</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Stop struggling with generic templates. BuildrAI analyzes your profile and generates
            tailored resumes, cover letters, and portfolios that stand out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link
              to="/app"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10"
            >
              Start Building Free
              <ArrowRight className="size-4" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 text-white border border-slate-700 rounded-full font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Play className="size-4 fill-current" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-500">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="size-10 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="size-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                +2k
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
              <span className="text-slate-400 text-sm ml-2">Loved by thousands of job seekers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
