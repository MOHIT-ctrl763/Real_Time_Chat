function SenderMessage({ image, message, createdAt }) {
  const time = createdAt ? new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit' }).format(new Date(createdAt)) : ''
  return <div className="flex justify-end"><div className="max-w-[82%] sm:max-w-[70%]"><div className="rounded-2xl rounded-br-md bg-gradient-to-br from-indigo-500 to-indigo-600 px-4 py-2.5 text-sm leading-6 text-white shadow-lg shadow-indigo-950/20">{image && <img src={image} alt="Sent attachment" className="mb-2 max-h-72 w-full rounded-xl object-cover" />}{message && <p className="whitespace-pre-wrap break-words">{message}</p>}</div>{time && <p className="mt-1 text-right text-[11px] text-slate-500">{time}</p>}</div></div>
}

export default SenderMessage
