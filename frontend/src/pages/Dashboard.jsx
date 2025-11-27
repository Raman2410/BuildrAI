import {  FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {dummyResumeData} from "../assets/assets"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext';

const Dashboard = () => {


  const {user,token} = useSelector((state)=>state.auth);
  const color =["#9333ea","#d97706","#dc2626","#0284c7" ,"#16a34a"];
  const [allResumes , setAllResumes] = useState([]);
 const [showCreateResume , setShowCreateResume] = useState(false);
 const [showUploadResume , setShowUploadResume] = useState(false);
 const [title , setTitle] = useState("");
 const [ resume,setResume] = useState(null);
  const [ editResumeId,setEditResumeId] = useState("");
  const [isLoading , setIsLoading] = useState(false);

  const navigate = useNavigate();


  const loadAllResumes = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    
    // Fixed: Properly structured axios GET request
    const { data } = await api.get('/api/users/resumes', {
      headers: {
        Authorization: token,
      }
    });
    
    console.log("Resumes loaded:", data.resumes); // Add this for debugging
    setAllResumes(data.resumes);
    
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error?.response?.data?.message || error.message);
  }
};

  const createResume = async (event) => {
    
    try {
       event.preventDefault();
       const {data} = await api.post('/api/resumes/create',{title},{headers:{
        Authorization:token
       }
       })
       setAllResumes([...allResumes,data.resume]);
       setTitle('');
       setShowCreateResume(false);
       navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }

  }
  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
        const resumeText = await pdfToText(resume);
         const {data} = await api.post('/api/ai/upload-resume',{title, resumeText},{headers:{
        Authorization:token
       }
       })
       setTitle('');
       setResume(null);
       setShowUploadResume(false);
       navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  }

  const editTitle = async(event) => {
    try {
       event.preventDefault();
         const {data} = await api.put(`/api/resumes/update/`,{resumeId :editResumeId,resumeData : {title}},{headers:{
        Authorization:token
       }})
       setAllResumes(allResumes.map((resume)=> resume._id === editResumeId ? {...resume,title}:resume))
       setTitle('');
       setEditResumeId('');
       toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
   
    
  }

  const deleteResume = async (resumeId) => {

    try {
       const confirmed = window.confirm("Are you sure you want to delete this resume?");
    if(confirmed){
      const {data} = await api.delete(`/api/resumes/delete/${resumeId}`,{headers:{
        Authorization:token
       }})
       setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
     toast.success('Resume deleted successfully');
    }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
   
    
  }

  useEffect(()=>{
    loadAllResumes();
  },[])
  return (
    <div className="min-h-[calc(100vh-80px)]">
      <div className='max-w-7xl mx-auto px-4 py-8'>
         <p className='text-3xl font-bold mb-8 text-white sm:hidden'>Welcome, {user?.name}</p>

         <div className='flex gap-4'>
          <button onClick={()=> setShowCreateResume(true)} className='w-full bg-slate-900/50 sm:max-w-48 h-56 flex flex-col items-center justify-center rounded-2xl gap-4 text-slate-400 border border-dashed border-slate-700 group hover:border-blue-500 hover:bg-slate-900 transition-all duration-300 cursor-pointer'>
            <div className="size-14 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-500 transition-all">
                <PlusIcon className='size-6'/>
            </div>
            <p className='text-sm font-medium group-hover:text-white transition-all'>Create New Resume</p>
          </button>

           <button onClick={()=>setShowUploadResume(true)} className='w-full bg-slate-900/50 sm:max-w-48 h-56 flex flex-col items-center justify-center rounded-2xl gap-4 text-slate-400 border border-dashed border-slate-700 group hover:border-purple-500 hover:bg-slate-900 transition-all duration-300 cursor-pointer'>
            <div className="size-14 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-500 transition-all">
                <UploadCloudIcon className='size-6'/>
            </div>
            <p className='text-sm font-medium group-hover:text-white transition-all'>Upload Existing</p>
          </button>
         </div>

         <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-slate-500 text-sm font-medium">Your Resumes</span>
            <div className="h-px bg-slate-800 flex-1" />
         </div>

         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {
            allResumes.map((resume,index)=>{
              const baseColor = color[index % color.length];
              return(
                <button key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)} className='relative w-full h-64 flex flex-col items-center justify-center rounded-2xl gap-4 border border-slate-800 bg-slate-900/50 group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer overflow-hidden'>
                  
                  {/* Decorative Gradient */}
                  <div className="absolute top-0 left-0 w-full h-1" style={{background: baseColor}} />
                  
                  <div className="size-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FilePenLineIcon className='size-8' style={{color:baseColor}}/>
                  </div>
                  
                  <div className="px-4 text-center">
                    <p className='text-base font-semibold text-white mb-1 line-clamp-1'>{resume.title}</p>
                    <p className='text-xs text-slate-500'>
                        Edited {new Date(resume.updatedAt).toLocaleDateString() }
                    </p>
                  </div>

                  <div onClick={e=> e.stopPropagation()} className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity'>
                    <button onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className='p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors'>
                        <PencilIcon className='size-4'/>
                    </button>
                    <button onClick={()=>deleteResume(resume._id)} className='p-2 bg-slate-800 hover:bg-red-900/50 rounded-lg text-slate-300 hover:text-red-400 transition-colors'>
                        <TrashIcon className='size-4'/>
                    </button>
                  </div>
                </button>
              ) 
            })
          }
         </div>
           
           {/* Create Resume Modal */}
           {
            showCreateResume && (
              <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4' action="">
                <div onClick={(e)=> e.stopPropagation()} className='relative bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl w-full max-w-md p-8'>
                  <h2 className='text-2xl font-bold mb-6 text-white'>Create New Resume</h2>
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-slate-400">Resume Title</label>
                    <input  onChange={(e)=>setTitle(e.target.value)} value ={title}  type="text" placeholder='e.g. Software Engineer 2024'  className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' required autoFocus/>
                  </div>

                  <button className='w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25'>Create Resume</button>
                  <button type="button" className='absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-800' onClick={()=>{setShowCreateResume(false); setTitle('')}}>
                    <XIcon className='size-5'/>
                  </button>
                </div>

              </form>
            )
           }

           {/* Upload Resume Modal */}
           {
            showUploadResume && (
                 <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4' action="">
                <div onClick={(e)=> e.stopPropagation()} className='relative bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl w-full max-w-md p-8'>
                  <h2 className='text-2xl font-bold mb-6 text-white'>Upload Resume</h2>
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-slate-400">Resume Title</label>
                    <input onChange={(e)=>setTitle(e.target.value)} value ={title} type="text" placeholder='e.g. Imported Resume'  className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' required/>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="resume-input" className='block text-sm font-medium text-slate-400 mb-2'>
                      Upload PDF
                    </label>
                    <div className='flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-700 bg-slate-800/50 rounded-xl p-8 hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group'>
                        {
                          resume ? (
                            <div className="flex items-center gap-3 text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg">
                                <FilePenLineIcon className="size-5"/>
                                <p className='font-medium truncate max-w-[200px]'>{resume.name}</p>
                            </div>
                          ):(
                            <>
                            <div className="p-4 rounded-full bg-slate-800 group-hover:bg-blue-500/20 group-hover:text-blue-500 transition-all text-slate-400">
                                <UploadCloud className="size-8"/>
                            </div>
                            <div className="text-center">
                                <p className='text-slate-300 font-medium'>Click to upload</p>
                                <p className="text-slate-500 text-xs mt-1">PDF files only (max 5MB)</p>
                            </div>
                            </>
                          )
                        }
                      </div>
                    <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])} />
                  </div>

                  <button disabled={isLoading} className='w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>{
                    isLoading && <LoaderCircleIcon className='animate-spin size-5 text-white'/>
                    
                    }{isLoading ? 'Processing...' : 'Upload & Convert'}</button>
                  <button type="button" className='absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-800' onClick={()=>{setShowUploadResume(false); setTitle('')}}>
                    <XIcon className='size-5'/>
                  </button>
                </div>

              </form>
            )
           }

             {
          editResumeId && (
              <form onSubmit={editTitle} onClick={()=>setEditResumeId(false)} className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4' action="">
                <div onClick={(e)=> e.stopPropagation()} className='relative bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl w-full max-w-md p-8'>
                  <h2 className='text-2xl font-bold mb-6 text-white'>Edit Title</h2>
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-slate-400">Resume Title</label>
                    <input  onChange={(e)=>setTitle(e.target.value)} value ={title}  type="text" placeholder='Enter resume title'  className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' required autoFocus/>
                  </div>

                  <button className='w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25'>Update Title</button>
                  <button type="button" className='absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-800' onClick={()=>{setEditResumeId(''); setTitle('')}}>
                    <XIcon className='size-5'/>
                  </button>
                </div>

              </form>
            )
           } 

      </div>
    </div>
  )
}

export default Dashboard