import { Loader2, Sparkles } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api';
import toast from 'react-hot-toast';

const SummaryForm = ({data , onChange , setResumeData}) => {
    const {token} = useSelector((state) => state.auth);

    const [isGenerating,setISGenerating] = React.useState(false);

    const generateSummary = async () => {
  if (!data || data.trim() === "") {
    toast.error("Please enter your summary before enhancing.");
    return;
  }

  try {
    console.log("🧠 Sending prompt:", data);
    setISGenerating(true);

    const prompt = `Enhance my professional summary: "${data}"`;
    const response = await api.post(
      "/api/ai/enhance-pro-sum",
      { userContent: prompt },
      { headers: { Authorization: token } }
    );

    console.log("✅ API Response:", response.data);
    setResumeData(prev => ({
      ...prev,
      professional_summary: response.data.enhanceContent,
    }));
  } catch (error) {
    console.error("❌ Error:", error);
    toast.error(error.message);
  } finally {
    setISGenerating(false);
  }
};

  return (
    <div className='space-y-4'>
           <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-900'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add summary for your resume...</p>
            </div>
           <button
  disabled={isGenerating}
  onClick={() => {
    console.log("🟢 AI Enhance button clicked");
    generateSummary();
  }}
  className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
>
  {isGenerating ? (
    <Loader2 className="size-4 animate-spin" />
  ) : (
    <Sparkles className="size-4" />
  )}
  {isGenerating ? "Generating..." : "AI Enhance"}
</button>

           </div>
  
   <div className='mt-6'>

    <textarea value={data ||""} onChange={(e)=> onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary here...'/>
        <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: keep it concise and focus on your most relevant achievements and skills...</p>
   </div>

    </div>
  )
}

export default SummaryForm