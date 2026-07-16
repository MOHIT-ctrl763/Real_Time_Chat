import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import useCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import useOtherUsers from './customHooks/getOtherUsers'
import {io} from "socket.io-client"
import { serverUrl } from './main'
import { setOnlineUsers } from './redux/userSlice'

function App() {
  useCurrentUser()
  useOtherUsers()
  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null)

  useEffect(()=>{
    if (!userData?._id) return undefined

      const socketio=io(`${serverUrl}`,{
        query:{
          userId:userData._id
        }
        })
        setSocket(socketio)
        
        socketio.on("getOnlineUsers",(users)=>{
          dispatch(setOnlineUsers(users))
        })
        
        return () => {
          socketio.close()
          setSocket(null)
        }

  },[dispatch, userData?._id])

  return (
    <Routes>
      <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userData?<Home socket={socket}/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App
