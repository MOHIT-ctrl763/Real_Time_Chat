import { useRef, useState } from 'react'
import dp from '../assets/dp.webp'
import { FiArrowLeft, FiCamera, FiCheck, FiMail, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'
import { setUserData } from '../redux/userSlice'

function Profile() {
  const userData = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState(userData?.name || '')
  const [imagePreview, setImagePreview] = useState(userData?.image || dp)
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const imageInput = useRef()

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleProfile = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      if (imageFile) formData.append('image', imageFile)
      const result = await axios.put(`${serverUrl}/api/user/profile`, formData, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate('/')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save your profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return <div className="app-shell flex min-h-screen items-center justify-center p-4"><div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#11182b] p-6 shadow-2xl shadow-black/30 sm:p-9"><button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"><FiArrowLeft />Back to messages</button><div className="mt-8 text-center"><div className="relative mx-auto h-28 w-28"><img src={imagePreview} alt="Profile" className="h-full w-full rounded-[28px] object-cover ring-4 ring-indigo-400/20" /><button type="button" onClick={() => imageInput.current?.click()} className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400" aria-label="Change profile photo"><FiCamera /></button></div><input ref={imageInput} type="file" accept="image/*" hidden onChange={handleImage} /><span className="mt-5 block text-sm font-medium text-indigo-300">YOUR PROFILE</span><h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Make it yours.</h1><p className="mt-2 text-sm text-slate-400">This is how friends will see you in Chatworld.</p></div><form onSubmit={handleProfile} className="mt-8 space-y-4"><label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Display name</span><div className="relative"><FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={name} onChange={(event) => setName(event.target.value)} required placeholder="How should people call you?" className="h-12 w-full rounded-xl border border-white/10 bg-[#080d1c] pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-indigo-400" /></div></label><div className="grid gap-4 sm:grid-cols-2"><div><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Username</span><div className="h-12 truncate rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">@{userData?.userName}</div></div><div><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Email</span><div className="flex h-12 items-center gap-2 truncate rounded-xl border border-white/5 bg-white/[0.03] px-4 text-sm text-slate-400"><FiMail className="shrink-0" />{userData?.email}</div></div></div>{error && <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-300">{error}</p>}<button disabled={saving} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:opacity-60">{saving ? 'Saving changes...' : <><FiCheck />Save profile</>}</button></form></div></div>
}

export default Profile
