import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CallToAction = () => {
  return (
    <div id="cta" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/20" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="glass-card rounded-3xl p-12 md:p-20 text-center border border-slate-800 bg-slate-900/50 relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 size-64 bg-purple-500/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 size-64 bg-blue-500/20 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium mb-8">
              <Sparkles className="size-4" />
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to <span className="text-gradient">Supercharge</span> <br />
              Your Career?
            </h2>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Join thousands of professionals who have already landed their dream jobs using BuildrAI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app?state=register"
                className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="size-5" />
              </Link>
              <Link
                to="/app?state=login"
                className="w-full sm:w-auto px-10 py-4 bg-slate-800 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700 hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;