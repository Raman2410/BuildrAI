import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonial = () => {
  const testimonials = [
    {
      name: "Richard Nelson",
      role: "CTO, Slack",
      content: "Radiant made undercutting all of our competitors an absolute breeze. The AI suggestions are spot on.",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
    },
    {
      name: "Ava Johnson",
      role: "Product Manager",
      content: "This platform helped us launch our product twice as fast as expected. The resume builder is intuitive and powerful.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
    },
    {
      name: "Liam Carter",
      role: "CEO, BrightTech",
      content: "Incredible support and a fantastic experience from start to finish. Highly recommended for job seekers.",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div id="testimonials" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800 text-purple-300 text-xs font-medium mb-6">
            <Quote className="size-3" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Loved by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See what our users have to say about their experience with BuildrAI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl relative group hover:bg-slate-900/80 transition-colors">
              <div className="absolute -top-4 -right-4 size-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all" />
              
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="size-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 mb-8 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="size-12 rounded-full border-2 border-slate-800 object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
