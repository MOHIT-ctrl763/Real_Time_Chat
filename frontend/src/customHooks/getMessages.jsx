import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const useMessages = () => {
  const dispatch = useDispatch()
  const selectedUser = useSelector((state) => state.user.selectedUser)

  useEffect(() => {
    if (!selectedUser?._id) {
      dispatch(setMessages([]))
      return undefined
    }

    const controller = new AbortController()

    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, {
          withCredentials: true,
          signal: controller.signal,
        })
        dispatch(setMessages(result.data || []))
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Unable to load messages", error)
          dispatch(setMessages([]))
        }
      }
    }

    fetchMessages()
    return () => controller.abort()
  }, [dispatch, selectedUser?._id])
}

export default useMessages
