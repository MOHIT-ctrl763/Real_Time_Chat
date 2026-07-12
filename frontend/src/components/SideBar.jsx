import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user)
    let [search, setSearch] = useState(false)
    let [input, setInput] = useState("")
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const handlesearch = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
            dispatch(setSearchData(result.data))
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (input) {
            handlesearch()
        }
    }, [input])

    return (
        <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-50 relative ${!selectedUser ? "block" : "hidden"}`}>

            {/* logout button */}
            <div
                className='w-[54px] h-[54px] rounded-full overflow-hidden flex justify-center items-center bg-white text-[#20c7ff] cursor-pointer shadow-lg shadow-slate-300 fixed bottom-[20px] left-[14px] z-[200] border border-slate-100 hover:bg-red-50 hover:text-red-500 transition-colors duration-200'
                onClick={handleLogOut}
            >
                <BiLogOutCircle className='w-[24px] h-[24px]' />
            </div>

            {/* search results dropdown */}
            {input.length > 0 &&
                <div className='flex absolute top-[230px] bg-white w-full h-[calc(100%-230px)] overflow-y-auto items-stretch pt-[10px] flex-col gap-[4px] z-[150] shadow-xl rounded-t-[24px] px-[10px]'>
                    {searchData?.length > 0 ? searchData.map((user) => (
                        <div
                            className='w-full h-[68px] flex items-center gap-[16px] px-[10px] rounded-2xl hover:bg-cyan-50 cursor-pointer transition-colors duration-150'
                            onClick={() => {
                                dispatch(setSelectedUser(user))
                                setInput("")
                                setSearch(false)
                            }}
                        >
                            <div className='relative flex justify-center items-center'>
                                <div className='w-[54px] h-[54px] rounded-full overflow-hidden flex justify-center items-center border-2 border-white shadow-md'>
                                    <img src={user.image || dp} alt="" className='h-full w-full object-cover' />
                                </div>
                                {onlineUsers?.includes(user._id) &&
                                    <span className='w-[12px] h-[12px] rounded-full absolute bottom-[2px] right-[0px] bg-[#3aff20] border-2 border-white'></span>}
                            </div>
                            <h1 className='text-slate-700 font-semibold text-[17px]'>{user.name || user.userName}</h1>
                        </div>
                    )) : (
                        <p className='text-center text-slate-400 text-[15px] mt-[30px]'>No users found</p>
                    )}
                </div>
            }

            {/* header */}
            <div className='w-full h-[280px] bg-gradient-to-br from-[#20c7ff] to-[#3b82f6] rounded-b-[36px] shadow-lg shadow-cyan-100 flex flex-col justify-center px-[24px] pt-[10px] relative overflow-hidden'>

                {/* decorative bubbles */}
                <div className='absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full'></div>
                <div className='absolute bottom-4 -left-8 w-20 h-20 bg-white/10 rounded-full'></div>

                <h1 className='text-white font-extrabold text-[24px] tracking-tight relative z-10'>Chatworld</h1>

                <div className='w-full flex justify-between items-center mt-[14px] relative z-10'>
                    <h1 className='text-white font-semibold text-[20px]'>Hii, {userData.name || "user"} 👋</h1>
                    <div
                        className='w-[56px] h-[56px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-lg border-2 border-white/60 hover:scale-105 transition-transform duration-200'
                        onClick={() => navigate("/profile")}
                    >
                        <img src={userData.image || dp} alt="" className='h-full w-full object-cover' />
                    </div>
                </div>

                <div className='w-full flex items-center gap-[16px] overflow-x-auto py-[16px] relative z-10'>
                    {!search &&
                        <div
                            className='w-[54px] h-[54px] shrink-0 rounded-full overflow-hidden flex justify-center items-center bg-white/90 shadow-md cursor-pointer hover:bg-white transition-colors duration-150'
                            onClick={() => setSearch(true)}
                        >
                            <IoIosSearch className='w-[22px] h-[22px] text-[#20c7ff]' />
                        </div>
                    }

                    {search &&
                        <form className='w-full h-[54px] bg-white shadow-md flex items-center gap-[10px] rounded-full overflow-hidden px-[18px]'>
                            <IoIosSearch className='w-[20px] h-[20px] text-slate-400 shrink-0' />
                            <input
                                type="text"
                                placeholder='Search users...'
                                className='w-full h-full text-[16px] outline-none border-0 text-slate-700 placeholder:text-slate-400'
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                            />
                            <RxCross2
                                className='w-[20px] h-[20px] text-slate-400 hover:text-slate-600 cursor-pointer shrink-0'
                                onClick={() => { setSearch(false); setInput("") }}
                            />
                        </form>
                    }

                    {!search && otherUsers?.map((user) => (
                        onlineUsers?.includes(user._id) &&
                        <div
                            className='relative shrink-0 rounded-full bg-white shadow-md flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-150'
                            onClick={() => dispatch(setSelectedUser(user))}
                        >
                            <div className='w-[54px] h-[54px] rounded-full overflow-hidden flex justify-center items-center border-2 border-white'>
                                <img src={user.image || dp} alt="" className='h-full w-full object-cover' />
                            </div>
                            <span className='w-[12px] h-[12px] rounded-full absolute bottom-[2px] right-[0px] bg-[#3aff20] border-2 border-white'></span>
                        </div>
                    ))}
                </div>
            </div>

            {/* chat list */}
            <div className='w-full h-[calc(100%-280px)] overflow-y-auto flex flex-col gap-[10px] items-center px-[12px] pt-[16px] pb-[90px]'>
                {otherUsers?.map((user) => (
                    <div
                        className='w-full h-[64px] flex items-center gap-[16px] px-[10px] bg-white shadow-sm border border-slate-100 rounded-2xl hover:bg-cyan-50 hover:border-cyan-100 cursor-pointer transition-colors duration-150'
                        onClick={() => dispatch(setSelectedUser(user))}
                    >
                        <div className='relative flex justify-center items-center'>
                            <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center'>
                                <img src={user.image || dp} alt="" className='h-full w-full object-cover' />
                            </div>
                            {onlineUsers?.includes(user._id) &&
                                <span className='w-[11px] h-[11px] rounded-full absolute bottom-[1px] right-[0px] bg-[#3aff20] border-2 border-white'></span>}
                        </div>
                        <h1 className='text-slate-700 font-semibold text-[17px]'>{user.name || user.userName}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar