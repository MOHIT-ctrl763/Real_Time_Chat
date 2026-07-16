import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import useMessages from '../customHooks/getMessages'


function Home({ socket }) {
  useMessages()
  return (
    <div className='app-shell w-full min-h-screen p-0 lg:p-5'>
      <main className='mx-auto flex h-screen max-w-[1600px] overflow-hidden bg-[#10172a]/80 lg:h-[calc(100vh-2.5rem)] lg:rounded-[28px] lg:border lg:border-white/10 lg:shadow-2xl lg:shadow-black/30'>
     <SideBar/>
     <MessageArea socket={socket}/>
      </main>
    </div>
  )
}

export default Home
