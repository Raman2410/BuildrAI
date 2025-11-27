import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/features/authSlice';

const Navbar = () => {
    const{user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutUser=()=>{
        navigate('/');
        dispatch(logout());

    }
  return (
    <div className='glass-nav sticky top-0 z-50'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-white transition-all'>
            <Link to='/'>
              <div className="flex items-center gap-2">
                <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <span className="text-lg font-bold text-white">B</span>
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  BuildrAI
                </span>
              </div>
            </Link>

            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden text-slate-300'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-5 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>

        </nav>
    </div>
  )
}

export default Navbar