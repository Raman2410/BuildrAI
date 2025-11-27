import React from 'react';
import { Zap, FileText, Download, Upload, CheckCircle2 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="size-6 text-blue-400" />,
      title: "AI-Powered Job-Fit Optimizer",
      description: "Instantly analyze your resume against job descriptions and get suggestions to maximize your chances of passing ATS."
    },
    {
      icon: <Upload className="size-6 text-purple-400" />,
      title: "Effortless Document Migration",
      description: "Upload your existing resume in any format (PDF, DOCX) and let our system automatically populate your data."
    },
    {
      icon: <Download className="size-6 text-pink-400" />,
      title: "Download-Ready Formats",
      description: "Export your final resume in multiple, pixel-perfect formats—PDF, DOCX, or direct share link."
    }
  ];

  return (
    <div id="features" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-xs font-medium mb-6">
            <Zap className="size-3" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything you need to <br/>
            <span className="text-gradient">land your dream job</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Our streamlined process helps you create a professional resume in minutes with the help of AI-powered tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300">
              <div className="size-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight Section */}
        <div className="mt-24 glass-card rounded-3xl p-8 md:p-12 border border-slate-800/50 bg-gradient-to-br from-slate-900 to-slate-950">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                        Smart Resume Analysis
                    </h3>
                    <p className="text-slate-400 text-lg">
                        Our AI doesn't just format your resume; it understands it. Get real-time feedback on keyword optimization, readability, and impact.
                    </p>
                    <ul className="space-y-4">
                        {[
                            'Real-time ATS scoring',
                            'Keyword optimization suggestions',
                            'Grammar and tone checks',
                            'Industry-specific templates'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="size-5 text-green-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-20 rounded-full" />
                    <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
                        {/* Mock UI */}
                        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-800" />
                                <div>
                                    <div className="h-2 w-24 bg-slate-700 rounded mb-2" />
                                    <div className="h-2 w-16 bg-slate-800 rounded" />
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                                98% Match
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-slate-800 rounded" />
                            <div className="h-2 w-5/6 bg-slate-800 rounded" />
                            <div className="h-2 w-4/6 bg-slate-800 rounded" />
                        </div>
                        <div className="mt-6 flex gap-3">
                            <div className="h-8 w-24 bg-blue-600 rounded-lg" />
                            <div className="h-8 w-24 bg-slate-800 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Features;