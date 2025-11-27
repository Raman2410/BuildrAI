import { Lock, Mail, User2Icon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../configs/api';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();

    const query = new URLSearchParams(window.location.search);
    const urlState = query.get("state");
    const [state, setState] = useState(urlState || "login");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`/api/users/${state}`, formData);
            
            // Save both token AND user to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Dispatch to Redux
            dispatch(login(data));
            
            toast.success(data.message);
            
        } catch (error) {
            toast(error?.response?.data?.message || error.message);
            console.log(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ... rest of your component

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-950 relative overflow-hidden'>
        {/* Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-700/20 rounded-full blur-[120px] pointer-events-none" />

       <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-slate-800 rounded-2xl px-8 py-10 glass-card relative z-10">
                <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 mx-auto mb-6">
                  <span className="text-xl font-bold text-white">B</span>
                </div>
                <h1 className="text-white text-3xl font-bold mb-2">{state === "login" ? "Welcome Back" : "Create Account"}</h1>
                <p className="text-slate-400 text-sm mb-8">Please {state} to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mb-4 w-full bg-slate-900/50 border border-slate-700 h-12 rounded-xl overflow-hidden pl-4 gap-3 focus-within:border-blue-500 transition-colors">
                        <User2Icon size={18} className="text-slate-400"/>
                        <input type="text" name="name" placeholder="Full Name" className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center mb-4 w-full bg-slate-900/50 border border-slate-700 h-12 rounded-xl overflow-hidden pl-4 gap-3 focus-within:border-blue-500 transition-colors">
                   <Mail size={18} className="text-slate-400"/>
                    <input type="email" name="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mb-6 w-full bg-slate-900/50 border border-slate-700 h-12 rounded-xl overflow-hidden pl-4 gap-3 focus-within:border-blue-500 transition-colors">
                   <Lock size={18} className="text-slate-400"/>
                    <input type="password" name="password" placeholder="Password" className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500" value={formData.password} onChange={handleChange} required />
                </div>
                
                <button type="submit" className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95">
                    {state === "login" ? "Sign In" : "Sign Up"}
                </button>
                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-slate-400 text-sm mt-6 cursor-pointer hover:text-white transition-colors">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"} <span className="text-blue-400 font-medium ml-1">Click here</span>
                </p>
            </form>
    </div>
  )
}

export default Login