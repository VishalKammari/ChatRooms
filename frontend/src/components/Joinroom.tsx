import Message from './Message'
import { FaGithub } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Joinroom = () => {
  const[name,Setname]=useState("");
  const[room,SetRoom]=useState("")
  const navigate = useNavigate();

  const Join=()=>{
    if(!name.trim() || !room.trim()){
      toast.error("Enter Name and RoomId");
      return;
    }
    localStorage.setItem("name", name);
    navigate(`/chat/${room}`);
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center relative bg-white px-4 py-10'>
      <a
        href="https://github.com/VishalKammari/ChatRooms"
        target="_blank"
        rel="noopener noreferrer"
        className='absolute top-4 right-4 sm:top-5 sm:right-5 border border-black/10 rounded-2xl px-4 py-3 flex items-center gap-3 hover:shadow-md transition-all duration-200 bg-white'>
        <div className='bg-black text-white p-2 rounded-xl'>
          <FaGithub size={18} />
        </div>
        <div className='leading-tight'>
          <h1 className='font-mono text-sm'>
            Vishal Kammari
          </h1>
        </div>
      </a>
      <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[30%] min-h-[50vh] flex flex-col gap-4 mb-10'>
        <div className='flex-1 flex flex-col justify-center items-center gap-3 text-center'>
          <Message />
          <h1 className='font-mono text-2xl sm:text-3xl'>
            Real Time Chat
          </h1>
          <h1 className='text-black/50 font-mono tracking-tight text-sm sm:text-base'>
            Fast, temporary chat rooms.
          </h1>
        </div>
        <Toaster />
        <div className='border border-black/10 w-full rounded-2xl p-4 sm:p-6 bg-white'>
          <div className="w-full h-12 border border-gray-300 rounded-2xl flex items-center px-4 mb-4">
            <input
              onChange={(e)=>Setname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full outline-none text-base sm:text-lg text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-3'>
            <div className="w-full h-12 border border-gray-300 rounded-2xl flex items-center px-4">
              <input
              onChange={(e)=>SetRoom(e.target.value)}
                type="text"
                placeholder="Enter Room Code"
                className="w-full outline-none text-base sm:text-lg text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            <button onClick={Join} className='bg-black/90 cursor-pointer text-white h-12 sm:w-24 rounded-2xl px-6 flex items-center justify-center hover:bg-black transition-all whitespace-nowrap'>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Joinroom