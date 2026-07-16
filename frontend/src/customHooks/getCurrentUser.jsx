import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"
import { clearAuthToken } from '../authToken'

const useCurrentUser=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
        } catch (error) {
            if (error.response?.status === 400 || error.response?.status === 401 || error.response?.status === 403) {
                clearAuthToken()
            }
            dispatch(setUserData(null))
            console.log(error)
            }
        }
        fetchUser()
    },[dispatch])
}

export default useCurrentUser
