import axios from 'axios'
import { useState } from 'react'
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiMessageCircle, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { setAuthToken } from '../authToken'

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ userName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, form, { withCredentials: true })
      setAuthToken(result.data.token)
      dispatch(setUserData(result.data.user))
      navigate('/profile')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create your account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'h-12 w-full rounded-xl border border-white/10 bg-[#080d1c] pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-indigo-400'

  return <div className="app-shell flex min-h-screen items-center justify-center p-4"><div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#11182b] shadow-2xl shadow-black/30 lg:grid-cols-[1fr_1.05fr]"><section className="hidden min-h-[620px] flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-600 to-sky-500 p-10 lg:flex"><div><div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15"><FiMessageCircle className="text-2xl text-white" /></div><p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">Chatworld</p><h1 className="mt-4 text-4xl font-bold leading-tight text-white">A better place to stay close.</h1><p className="mt-4 max-w-sm leading-7 text-indigo-100">Share small moments, big ideas, and everything in between with the people who matter.</p></div><p className="text-sm text-indigo-100">Private, fast and made for real conversations.</p></section><section className="p-7 sm:p-10"><div className="mx-auto max-w-sm"><span className="text-sm font-medium text-indigo-300">CREATE ACCOUNT</span><h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Join the conversation.</h2><p className="mt-2 text-sm text-slate-400">Set up your account in under a minute.</p><form onSubmit={handleSubmit} className="mt-8 space-y-4"><label className="relative block"><FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={form.userName} onChange={(event) => setForm({ ...form, userName: event.target.value })} required placeholder="Username" className={inputClass} /></label><label className="relative block"><FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required type="email" placeholder="Email address" className={inputClass} /></label><label className="relative block"><FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength="6" type={showPassword ? 'text' : 'password'} placeholder="Password (6+ characters)" className={inputClass} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-white" aria-label="Toggle password visibility">{showPassword ? <FiEyeOff /> : <FiEye />}</button></label>{error && <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-300">{error}</p>}<button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:opacity-60">{loading ? 'Creating account...' : <>Create account <FiArrowRight /></>}</button></form><p className="mt-6 text-center text-sm text-slate-400">Already have an account? <button onClick={() => navigate('/login')} className="font-semibold text-indigo-300 hover:text-indigo-200">Log in</button></p></div></section></div></div>
}

export default SignUp
