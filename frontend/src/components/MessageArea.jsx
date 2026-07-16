import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiImage, FiMoreHorizontal, FiPaperclip, FiSend, FiSmile, FiX } from 'react-icons/fi'
import dp from '../assets/dp.webp'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import EmojiPicker from 'emoji-picker-react'
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import axios from 'axios'
import { serverUrl } from '../main'
import { addMessage } from '../redux/messageSlice'

function MessageArea({ socket }) {
  const { selectedUser, userData, onlineUsers } = useSelector((state) => state.user)
  const messages = useSelector((state) => state.message.messages)
  const displayedMessages = Array.isArray(messages) ? messages : []
  const dispatch = useDispatch()
  const [showPicker, setShowPicker] = useState(false)
  const [input, setInput] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [sending, setSending] = useState(false)
  const imageInput = useRef()
  const messageEnd = useRef()

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedUser?._id])

  useEffect(() => {
    const receiveMessage = (message) => {
      if (message.sender === selectedUser?._id) {
        dispatch(addMessage(message))
      }
    }

    socket?.on('newMessage', receiveMessage)
    return () => socket?.off('newMessage', receiveMessage)
  }, [dispatch, selectedUser?._id, socket])

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
  }, [imagePreview])

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    event.target.value = ''
  }

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(null)
    setImageFile(null)
  }

  const handleSendMessage = async (event) => {
    event.preventDefault()
    if ((!input.trim() && !imageFile) || !selectedUser?._id || sending) return

    setSending(true)
    try {
      const formData = new FormData()
      formData.append('message', input.trim())
      if (imageFile) formData.append('image', imageFile)
      const result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials: true })
      dispatch(addMessage(result.data))
      setInput('')
      clearImage()
      setShowPicker(false)
    } catch (error) {
      console.error('Unable to send message', error)
    } finally {
      setSending(false)
    }
  }

  const selectedUserIsOnline = (onlineUsers || []).includes(selectedUser?._id)

  if (!selectedUser) {
    return <section className="relative hidden h-full flex-1 overflow-hidden bg-[#0d1425] lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative max-w-md px-8 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] bg-gradient-to-br from-indigo-500 to-sky-400 shadow-2xl shadow-indigo-500/20"><FiSend className="ml-1 text-3xl text-white" /></div><h1 className="mt-7 text-3xl font-bold tracking-tight text-white">Your conversations, centered.</h1><p className="mt-3 leading-7 text-slate-400">Choose someone from your messages to continue a conversation, or use search to begin a new one.</p></div>
    </section>
  }

  return (
    <section className="relative flex h-full min-w-0 flex-1 flex-col bg-[#0d1425]">
      <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/5 bg-[#11182b]/90 px-4 backdrop-blur sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={() => dispatch(setSelectedUser(null))} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden" aria-label="Back to messages"><FiArrowLeft className="text-xl" /></button>
          <div className="relative h-11 w-11 shrink-0"><img src={selectedUser.image || dp} alt="" className="h-full w-full rounded-2xl object-cover" />{selectedUserIsOnline && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#11182b] bg-emerald-400" />}</div>
          <div className="min-w-0"><h1 className="truncate font-semibold text-slate-100">{selectedUser.name || selectedUser.userName}</h1><p className="mt-0.5 text-xs text-slate-400">{selectedUserIsOnline ? 'Online now' : `@${selectedUser.userName}`}</p></div>
        </div>
        <button className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white" aria-label="Conversation options"><FiMoreHorizontal className="text-xl" /></button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <div className="mb-2 self-center rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-xs text-slate-500">Messages are private between you and {selectedUser.name || selectedUser.userName}</div>
          {displayedMessages.map((message) => message.sender === userData?._id ? <SenderMessage key={message._id} image={message.image} message={message.message} createdAt={message.createdAt} /> : <ReceiverMessage key={message._id} image={message.image} message={message.message} createdAt={message.createdAt} />)}
          <div ref={messageEnd} />
        </div>
      </div>

      <div className="relative shrink-0 border-t border-white/5 bg-[#11182b]/85 px-4 py-3 backdrop-blur sm:px-6">
        {showPicker && <div className="absolute bottom-[84px] left-4 z-20 shadow-2xl sm:left-6"><EmojiPicker width={310} height={360} theme="dark" onEmojiClick={(emojiData) => { setInput((value) => value + emojiData.emoji); setShowPicker(false) }} /></div>}
        {imagePreview && <div className="mx-auto mb-3 flex max-w-3xl items-start gap-3"><div className="relative"><img src={imagePreview} alt="Selected attachment" className="h-20 w-20 rounded-xl object-cover" /><button onClick={clearImage} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-white shadow-lg" aria-label="Remove attachment"><FiX /></button></div><span className="pt-2 text-sm text-slate-400">Image ready to send</span></div>}
        <form onSubmit={handleSendMessage} className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-white/10 bg-[#080d1c] p-2 shadow-xl shadow-black/10">
          <button type="button" onClick={() => setShowPicker((value) => !value)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-indigo-300" aria-label="Add emoji"><FiSmile className="text-xl" /></button>
          <input ref={imageInput} type="file" accept="image/*" hidden onChange={handleImage} />
          <button type="button" onClick={() => imageInput.current?.click()} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-indigo-300" aria-label="Attach image"><FiPaperclip className="text-xl" /></button>
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Write a message..." className="h-10 min-w-0 flex-1 bg-transparent px-1 text-sm text-slate-100 placeholder:text-slate-500" />
          <button type="submit" disabled={sending || (!input.trim() && !imageFile)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message">{sending ? <FiImage className="animate-pulse" /> : <FiSend className="ml-0.5" />}</button>
        </form>
      </div>
    </section>
  )
}

export default MessageArea
