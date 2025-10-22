import { Loader2, Sparkles } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const SummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setISGenerating] = React.useState(false);

  const generateSummary = async () => {
    console.log("🔹 AI Enhance button clicked");

    if (!data || data.trim() === "") {
      console.warn("⚠️ No summary text found — cannot enhance.");
      toast.error("Please write a summary before enhancing.");
      return;
    }

    try {
      setISGenerating(true);
      console.log("🔹 Generating enhanced summary...");
      console.log("🧠 Prompt being sent:", data);
      console.log("🔑 Token:", token ? "Token found ✅" : "No token ❌");

      const prompt = `Enhance my professional summary: "${data}"`;

      const response = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ API Response Received:", response.data);

      const enhancedText =
        response.data.enhanceContent || response.data.enhancedContent || "";

      if (enhancedText) {
        console.log("✨ Enhanced Summary:", enhancedText);
      } else {
        console.warn("⚠️ No 'enhanceContent' field found in response.");
      }

      setResumeData((prev) => ({
        ...prev,
        professional_summary: enhancedText,
      }));

      toast.success("Summary enhanced successfully!");
    } catch (error) {
      console.error("❌ AI Enhance Error:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setISGenerating(false);
      console.log("🔹 AI Enhance process completed.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume...
          </p>
        </div>
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          //  onClick={() => console.log("Button Clicked ✅")}
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

      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary here..."
        />
        <p className="text-xs text-gray-500 max-w-[80%] mx-auto text-center">
          Tip: keep it concise and focus on your most relevant achievements and
          skills...
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
