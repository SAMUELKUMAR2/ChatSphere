import React, { useState, useEffect } from 'react'
import add from '../image/add.png'

import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import more from '../image/more.png';

const ChatMember = ({userData, setChatSelect,setSelectedUserData }) => {
  const navigate = useNavigate();

  const [userList,setUserList]= useState([])

 
  const handleClick = () => {

   
   
    navigate(`/admin/${userData._id}/newContact`,{state:{userData:userData}});
    // // Scroll to the form
    // if (formRef.current) {
    //   formRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
  }
  // Post NewContact data

  useEffect(() => {
    fetchData()
    }, []);
    
    const fetchData= async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/${userData._id}`);

        setUserList(response.data.allContacts);
  
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    }

    const handleLogout=()=>{
      navigate("/login");
  }
    
  return (
    <div className="w-full h-full ">
      <div>
        <div className='m-1 sticky top-0'>
          <div className='mx-3 flex justify-between'>
            <span className=' text-2xl text-black font-bold'>{userData.username} 
              <span className='text-xl text-black font-bold'>({userData.mobile})</span></span>
          <div className='flex gap-3'>
              {/* AddButton */}
              <img className='w-8 h-8 bg-white rounded-full cursor-pointer  transition-transform duration-300 hover:scale-125'
               onClick={handleClick} src={add} alt="" />
         {/* Logout */}
        <div>
         <button onClick={handleLogout} className='md:hidden  w-fit px-3  py-1 bg-red-500 hover:bg-red:300 text-white font-semibold rounded-full  transition-transform duration-300 hover:scale-130'>
         Logout</button>
         </div>
          </div>
          </div>
        </div>
        <div className='m-3'>
          <input className=' p-2 w-full bg-slate-200 rounded-xl' type="text" placeholder='Enter to search' />

        </div>
        <div className='ml-3 flex  gap-2'>
          <button className='bg-slate-300 py-2 px-4 rounded-full'>All</button>
          <button className='bg-slate-300 py-2 px-3 rounded-full'>Unseen</button>
          <button className='bg-slate-300 py-2 px-3 rounded-full'>Group</button>
        </div>
      </div>

        {/* All Contact */}
      <div className='p-4 h-[70vh] overflow-y-scroll '>


        {userList.map((user) => (
        
            <div className='flex justify-between mb-3 pb-1 w-full cursor-pointer  border-b-2 hover:bg-slate-300' key={user._id} onClick={() => 
              {setChatSelect(true)
                setSelectedUserData(user)
              
            }

            }>
             <div className='flex ' >
              <img className='w-12 h-12 rounded-full ' src={user.image} alt='' >
              
              </img>
              
              <div className='ml-3 w-full '>
                <span>{user.username}</span>
                <p> {user.mobile}</p>
              </div>
              </div>
             <div className=''  >
             <button className='ml-3   hover:bg-slate-100 hover:rounded-full hover:text-white'>
                <img className="w-8 h-8" src={more} alt="" />
              </button>
          
         
            </div>
            
            </div>
        ))}
      </div>

    
    </div>

  )
}

export default ChatMember