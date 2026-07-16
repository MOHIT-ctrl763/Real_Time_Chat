import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice'

function Login() {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")
    let dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email, password
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            dispatch(setSelectedUser(null))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error.response.data.message)
        }
    }

    return (
        <div className='w-full min-h-[100vh] bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4 py-8 relative overflow-hidden'>

            {/* ambient background blobs */}
            <div className='absolute -top-20 -left-20 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-40'></div>
            <div className='absolute -bottom-24 -right-16 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40'></div>

            <div className='w-full max-w-[440px] bg-white rounded-[28px] shadow-2xl shadow-slate-300/60 flex flex-col overflow-hidden relative z-10 border border-slate-100'>

                {/* hero */}
                <div className='w-full h-[190px] bg-gradient-to-br from-[#20c7ff] to-[#3b82f6] relative flex flex-col items-center justify-center overflow-hidden'>
                    {/* floating chat bubbles */}
                    <div className='absolute top-6 left-8 w-8 h-8 bg-white/25 rounded-full float-a'></div>
                    <div className='absolute bottom-8 right-10 w-10 h-10 bg-white/20 rounded-full float-b'></div>
                    <div className='absolute top-10 right-16 w-5 h-5 bg-white/30 rounded-full float-c'></div>

                    <div className='w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-3 rotate-[-6deg]'>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                    </div>
                    <h1 className='text-white font-bold text-[26px] tracking-tight'>Welcome back to <span className='font-extrabold'>ChatWorld</span></h1>
                    <p className='text-white/80 text-[14px] mt-1'>Log in to keep the conversation going</p>
                </div>

                {/* form */}
                <form className='w-full flex flex-col gap-[16px] items-center px-8 py-8' onSubmit={handleLogin}>

                    <div className='w-full relative'>
                        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16v16H4z" stroke="none" />
                                <path d="M22 6 12 13 2 6" />
                                <path d="M2 6h20v12H2z" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            placeholder='Email'
                            className='w-full h-[52px] outline-none border-2 border-slate-200 focus:border-[#20c7ff] pl-11 pr-4 rounded-xl text-gray-700 text-[16px] transition-colors duration-200'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className='w-full relative'>
                        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <input
                            type={show ? "text" : "password"}
                            placeholder='Password'
                            className='w-full h-[52px] outline-none border-2 border-slate-200 focus:border-[#20c7ff] pl-11 pr-11 rounded-xl text-gray-700 text-[16px] transition-colors duration-200'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <span
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#20c7ff] cursor-pointer transition-colors'
                            onClick={() => setShow(prev => !prev)}
                        >
                            {show ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </span>
                    </div>

                    {err && <p className='w-full text-left text-red-500 text-[14px] shake'>{"⚠ " + err}</p>}

                    <button
                        className='w-full h-[52px] bg-gradient-to-r from-[#20c7ff] to-[#3b82f6] rounded-xl shadow-lg shadow-cyan-200 text-white text-[17px] font-semibold mt-1 transition-all duration-200 hover:shadow-xl hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0'
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className='text-slate-500 text-[14px] mt-2'>
                        New here?{" "}
                        <span
                            className='text-[#20c7ff] font-semibold cursor-pointer hover:underline'
                            onClick={() => navigate("/signup")}
                        >
                            Create an account
                        </span>
                    </p>
                </form>
            </div>

            <style>{`
                .float-a { animation: floatA 4s ease-in-out infinite; }
                .float-b { animation: floatB 5s ease-in-out infinite; }
                .float-c { animation: floatC 3.5s ease-in-out infinite; }
                @keyframes floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes floatB { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
                @keyframes floatC { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-6px,6px); } }
                .shake { animation: shake 0.4s ease-in-out; }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-6px); }
                    40%, 80% { transform: translateX(6px); }
                }
            `}</style>
        </div>
    )
}

export default Login
