import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiLogOut, FiMessageCircle, FiSearch, FiSettings, FiX } from 'react-icons/fi'
import dp from '../assets/dp.webp'
import { serverUrl } from '../main'
import axios from 'axios'
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Avatar({ user, online, size = 'md' }) {
  const dimensions = size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'
  return (
    <div className={`relative shrink-0 ${dimensions}`}>
      <img src={user?.image || dp} alt="" className="h-full w-full rounded-2xl object-cover" />
      {online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#11182b] bg-emerald-400" />}
    </div>
  )
}

function SideBar() {
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector((state) => state.user)
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const displayUsers = useMemo(() => (query.trim() ? searchData || [] : otherUsers || []), [otherUsers, query, searchData])

  useEffect(() => {
    if (!query.trim()) {
      dispatch(setSearchData([]))
      return undefined
    }

    const timer = setTimeout(async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/search`, {
          params: { query },
          withCredentials: true,
        })
        dispatch(setSearchData(result.data || []))
      } catch (error) {
        console.error('Unable to search users', error)
        dispatch(setSearchData([]))
      }
    }, 250)

    return () => clearTimeout(timer)
  }, [dispatch, query])

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setSelectedUser(null))
      dispatch(setUserData(null))
      dispatch(setOtherUsers([]))
      navigate('/login')
    } catch (error) {
      console.error('Unable to log out', error)
    }
  }

  const chooseUser = (user) => {
    dispatch(setSelectedUser(user))
    setQuery('')
  }

  return (
    <aside className={`h-full w-full shrink-0 border-r border-white/5 bg-[#11182b] lg:block lg:w-[380px] ${selectedUser ? 'hidden' : 'block'}`}>
      <div className="flex h-full flex-col px-4 pb-4 pt-5">
        <header className="flex items-center justify-between px-2">
          <button onClick={() => dispatch(setSelectedUser(null))} className="flex items-center gap-2 text-left" aria-label="Chatworld home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-sky-400 shadow-lg shadow-indigo-500/20"><FiMessageCircle className="text-xl text-white" /></span>
            <span className="text-lg font-bold tracking-tight text-white">Chatworld</span>
          </button>
          <button onClick={() => navigate('/profile')} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white" aria-label="Profile settings"><FiSettings /></button>
        </header>

        <button onClick={() => navigate('/profile')} className="mt-7 flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 text-left transition hover:bg-white/[0.07]">
          <Avatar user={userData} online size="lg" />
          <span className="min-w-0"><span className="block truncate font-semibold text-slate-100">{userData?.name || userData?.userName || 'Your profile'}</span><span className="mt-0.5 block text-xs text-slate-400">Available to chat</span></span>
        </button>

        <div className="relative mt-6">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" className="h-12 w-full rounded-2xl border border-white/5 bg-[#080d1c] pl-11 pr-10 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-indigo-400/60" />
          {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:text-white" aria-label="Clear search"><FiX /></button>}
        </div>

        <div className="mt-7 flex items-center justify-between px-2"><h1 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{query ? 'Search results' : 'Messages'}</h1><span className="rounded-full bg-indigo-400/10 px-2 py-0.5 text-xs font-semibold text-indigo-300">{displayUsers.length}</span></div>

        <div className="mt-3 flex-1 space-y-1 overflow-y-auto pr-1">
          {displayUsers.map((user) => {
            const active = selectedUser?._id === user._id
            const online = (onlineUsers || []).includes(user._id)
            return <button key={user._id} onClick={() => chooseUser(user)} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${active ? 'bg-gradient-to-r from-indigo-500/25 to-sky-500/10 shadow-sm ring-1 ring-indigo-400/20' : 'hover:bg-white/[0.05]'}`}>
              <Avatar user={user} online={online} />
              <span className="min-w-0 flex-1"><span className="block truncate font-semibold text-sm text-slate-100">{user.name || user.userName}</span><span className="mt-0.5 block truncate text-xs text-slate-500">{online ? 'Online now' : `@${user.userName}`}</span></span>
              {online && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
            </button>
          })}
          {displayUsers.length === 0 && <p className="px-3 pt-10 text-center text-sm text-slate-500">{query ? 'No people found.' : 'No conversations yet. Search for someone to start chatting.'}</p>}
        </div>

        <button onClick={handleLogOut} className="mt-3 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-rose-400/10 hover:text-rose-300"><FiLogOut className="text-lg" />Sign out</button>
      </div>
    </aside>
  )
}

export default SideBar
