function ReceiverMessage({ image, message, createdAt }) {
  const time = createdAt ? new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit' }).format(new Date(createdAt)) : ''
  return <div className="flex justify-start"><div className="max-w-[82%] sm:max-w-[70%]"><div className="rounded-2xl rounded-bl-md border border-white/5 bg-[#172035] px-4 py-2.5 text-sm leading-6 text-slate-200 shadow-lg shadow-black/10">{image && <img src={image} alt="Received attachment" className="mb-2 max-h-72 w-full rounded-xl object-cover" />}{message && <p className="whitespace-pre-wrap break-words">{message}</p>}</div>{time && <p className="mt-1 text-[11px] text-slate-500">{time}</p>}</div></div>
}

export default ReceiverMessage
