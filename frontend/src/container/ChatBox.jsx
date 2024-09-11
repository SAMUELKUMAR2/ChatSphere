import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import BackArrow from '../image/BackArrow.png'
import videocall  from '../image/videocall.png'
import search  from '../image/search.png'
import menu  from '../image/menu.png'
import smile  from '../image/smile.png'
import add  from '../image/add.png'
import mic  from '../image/mic.png'
import send  from '../image/send.png'


function ChatBox({userData,setChatSelect,selectedUserData}) {

const navigate = useNavigate();
  const [message ,setMessage] = useState("");
  const [messageData,setMessageData] = useState([]);

 
  const inputChange = (e)=>{
    setMessage(e.target.value)
    
  }
  const handleLogout=()=>{
      navigate("/login");
  }

  useEffect(() => {
    fetchMessages()
    }, [message,selectedUserData]);
    
    const fetchMessages= async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/${selectedUserData._id}/messages`);

        // console.log(response.data.messages);
        setMessageData(response.data.messages);
  
      } 
      catch (error) {
        console.error('Error fetching names:', error);
      }
    }

  const handleSubmit=async()=>{
// userData means AdminData
    try {
      const response = await axios.post(`http://localhost:8080/admin/${userData._id}/messages`,{senderMobile:userData.mobile, receiverMobile:selectedUserData.mobile, message:message,})
      // console.log(response);
      setMessageData(response.data.messages)
      console.log(messageData);

      setMessage("")
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  
    
  }

    return (
        <>
          <div className='p-3 max-md:p-1 max-md:h-[98vh] max-md:overflow-hidden w-full h-full  flex flex-col justify-between  bg-slate-400 '>

        <div className='sticky top-0 w-full flex justify-between '> 
          {/* BackButton */}
          <img className='w-[5vw] h-[5vh] md:w-[3vw] md:h-[4vh]  transition-transform duration-300 hover:scale-125 hover:bg-slate-50 hover:rounded-full cursor-pointer' 
          onClick={()=>setChatSelect(false)} 
          src={BackArrow} alt="" />
          {/* Logout Button */}
          <button onClick={handleLogout} className='w-fit px-3  py-1 bg-red-500 hover:bg-red:300 text-white font-semibold rounded-full  transition-transform duration-300 hover:scale-130'>
          Logout</button>
          </div>
          
       {/* Top Menu */}
       <div className=' mx-4 flex justify-between w-full h-[11vh] items-center'>
       <div className=' flex   h-full items-center gap-3'>
       <img className='w-12 h-12 rounded-full ' src={selectedUserData.image} alt='' ></img>
         <span>{selectedUserData.username}</span>
         </div>
       
         <div className=' flex w-fit h-[4vh] items-center gap-4'>
         <img className='h-[4vh] ' src={videocall} alt="" />
          <img className='h-[4vh]' src={search} alt="" />  
          <img className='h-[4vh] mr-8' src={menu} alt="" />

         </div>
       </div>
       {/* Messages */}
       <div className='w-full h-[84vh] flex justify-end flex-col my-3 bg-green-500 rounded-md max-md:overflow-y-scroll overflow-y-scroll'>
     
     {messageData.map((msg) => (
          
          <div key={msg.senderId} className={` m-2 pb-1 w-fit p-2 pl-4 border-2 ${msg.senderId === userData._id ? "bg-orange-300 self-end":"bg-white"} rounded-[15px] rounded-bl-none`}>
             <b>{msg.senderId === userData._id ? 'you' : 'them'}:</b> {msg.message}
            
    <p className='text-[9px]  opacity-60 pt-1 '>{}</p>
   </div>    
      ))}
<<<<<<< HEAD

       </div>
=======
   </div>
>>>>>>> cd19511db24314545bfda57401532bf8f2e7a4a3
       {/* input box */}
       <div className="sticky bottom-0  w-full h-[5vh] flex   gap-4">
        <div className="flex ">
            <img className='h-[5vh] cursor-pointer' src={smile} 
            alt="" />
            <img className='h-[5vh] ml-2 cursor-pointer' src={add} alt="" />
        </div>
        <div className="flex w-full gap-2">
            <input className='w-full rounded-lg px-3' type="text" placeholder='Type a message...'
            value={message}
            onChange={inputChange}
            />
            <div className='flex gap-2'>
            <button onClick={handleSubmit} className='h-[5vh] p-1 flex justify-center items-center rounded-full bg-slate-50 transition-transform duration-300 hover:scale-125 cursor-pointer'>
            <img  className='h-[4vh] p-1 items-center  cursor-pointer' 
            src={send} alt="" />
            </button>
   <img className='h-[5vh] p-1 items-center rounded-full bg-slate-50 cursor-pointer' src={mic} alt="" />

            </div>
            </div>
       </div>
      

          </div>
        </>
      )
}

export default ChatBox
