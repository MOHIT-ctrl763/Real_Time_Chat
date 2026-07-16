import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const useOtherUsers=()=>{
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        if (!userData?._id) {
            dispatch(setOtherUsers([]))
            return undefined
        }

        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
                dispatch(setOtherUsers(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[dispatch, userData?._id])
}

export default useOtherUsers
