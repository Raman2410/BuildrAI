import React, { useState } from 'react';
import {Zap} from 'lucide-react';
import Title from './Title';
const Features = () => {
      const [isHover, setIsHover] = useState(false);
  return (
     <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>


          <div className="flex items-center gap-2 text-sm text-blue-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1">
           <Zap width={14}/>
            <span>Simple Process</span>
        </div>
        <Title title='Build your resume' description='Our streamlined process helps you create a professional resume in minutes with the help of AI-powered tools.'/>
            <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-blue-100 border border-transparent group-hover:border-blue-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-blue-300 bg-blue-100' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-blue-600"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">AI-Powered Job-Fit Optimizer</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Instantly analyze your resume against job descriptions and get suggestions to maximize your chances of passing Applicant Tracking Systems (ATS).</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-blue-200 border border-transparent group-hover:border-blue-300 flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-blue-600"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Effortless Document Migration</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Upload your existing resume in any format (PDF, DOCX) and let our system automatically populate and update your data into a modern template.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-blue-300 border border-transparent group-hover:border-blue-300 flex gap-4 rounded-xl transition-colors">
                            <svg className="size-6 stroke-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Download-Ready Professional Formats</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Export your final resume in multiple, pixel-perfect formats—PDF, DOCX, or direct share link—ready for any application process.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </div>
    );
};
  
export default Features