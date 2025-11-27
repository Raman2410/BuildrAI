import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import SummaryForm from "../components/SummaryForm";
import ExperieceForm from "../components/ExperieceForm";
import EducationForm from "../components/EducationForm";
import SkillsForm from "../components/SkillsForm";
import ProjectForm from "../components/ProjectForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuild = () => {
  const { resumeId } = useParams();

  const {token} = useSelector(state=>state.auth);
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: "false",
  });

  const loadExistingResume = async () => {
    try {
        const {data} = await api.get('/api/resumes/get/' + resumeId,{
          headers:{
            Authorization:token
          }
        })
        if(data.resume){
          setResumeData(data.resume);
          document.title = data.resume.title;
        }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: " Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumevisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData",JSON.stringify({public:!resumeData.public}));


      const {data} = await api.put('/api/resumes/update' ,formData,{
          headers:{ Authorization:token }})
          setResumeData({...resumeData , public:!resumeData.public})
          toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const shareResume = async () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if(navigator.share) {
      navigator.share({url:resumeUrl,text:"My Resume"})
  }else{
    alert("Share not supported on this browser...")
  }}

  const downloadResume = async () => {
    window.print();
  }


  const saveResume = async()=>{
    try {
      let updatedResumeData = structuredClone(resumeData);
      if(typeof resumeData.personal_info.image === 'object'){
        delete updatedResumeData.personal_info.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground","yes");
      typeof resumeData.personal_info.image === 'object' && formData.append("image",resumeData.personal_info.image);

      const {data} = await api.put('/api/resumes/update',formData,{headers:{Authorization:token}});
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.log("Error saving resume:",error)
    }
  }
  // console.log("🧩 Current activeSection:", activeSection);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - form */}
          <div className="relative lg:col-span-5 rounded-xl overflow-hidden">
            <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6 pt-1">
              {/* progress bar using activeSectionIndex */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800" />
              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 py-4">
                <div className="flex items-center gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={activeSectionIndex === 0}
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.max(prevIndex - 1, 0)
                      )
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <button
                    className="flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div>
                {/* form content */}
                <div className="space-y-6">
                  {activeSection.id === "personal" && (
                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  )}

                  {
                    activeSection.id === "summary" && (
                        <SummaryForm  data={resumeData.professional_summary}onChange={(data)=> setResumeData((prev) => ({
                          ...prev,
                          professional_summary: data
                        })) 
                        } setResumeData={setResumeData}/>
                    )
                  }

                  {
                     activeSection.id === "experience" && (
                      <ExperieceForm data={resumeData.experience} onChange={(data)=> setResumeData((prev) =>({...prev,experience: data}))} />
                     )
                  }

                  {
                    activeSection.id === "education" && (
                      <EducationForm data={resumeData.education}
                      onChange={(data)=> setResumeData((prev) =>({...prev,education: data}))}  />
                    )

                  }
                   {
                    activeSection.id === "projects" && (
                      <ProjectForm data={resumeData.project}
                      onChange={(data)=> setResumeData((prev) =>({...prev,project: data}))}  />
                    )

                  }
                    {
                    activeSection.id === "skills" && (
                      <SkillsForm data={resumeData.skills}
                      onChange={(data)=> setResumeData((prev) =>({...prev,skills: data}))}  />
                    )}
                </div>
                <button onClick={()=>{toast.promise(saveResume,{loading:'Saving...'})}} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl px-6 py-3 mt-8 transition-all shadow-lg shadow-blue-500/25">Save Changes</button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full mb-4">

              <div className="flex items-center justify-end gap-3">
                {
                  resumeData.public && (
                    <button onClick={shareResume} className="flex items-center p-2 px-4 gap-2 text-sm bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:border-blue-500 hover:text-white transition-all">
                      <Share2Icon className="size-4"/>Share
                    </button>
                  )
                }

                <button onClick={changeResumevisibility} className="flex items-center p-2 px-4 gap-2 text-sm bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:border-blue-500 hover:text-white transition-all">
                  {resumeData.public ? <EyeIcon className="size-4"/> :
                  <EyeOffIcon className="size-4"/>}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button onClick={downloadResume} className="flex items-center p-2 px-4 gap-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all shadow-lg shadow-green-500/20">
                  <Download className="size-4"/>Download PDF
                </button>

              </div>
            </div>

            {/* resume preview */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
                <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuild;
