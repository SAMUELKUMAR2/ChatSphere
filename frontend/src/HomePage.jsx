
import { useState } from 'react';
import './App.css';
import ChatThumnail from './container/ChatThumbnail';
import ChatBox from './container/ChatBox';

// import Sidebar from './container/Sidebar';
import ChatMember from './container/ChatMember';
import { useLocation } from 'react-router-dom';

function HomePage() {

  // let messageBox =false;
  const location = useLocation();
  const { userData } = location.state || {};

    const [chatSelect,setChatSelect] = useState(false);
    const [selectedUser,setSelectedUser] = useState("");
    const [selectedUserImage,setSelectedUserImage] = useState("");
    return (

    
    <div className={`App  flex w-full h-[100vh]`}>
       {/* <div className={`sidebar w-[5vw] h-full bg-slate-100 `}>
  
        <Sidebar />
       </div> */}
       {userData ?
       <div className={chatSelect?'max-md:hidden':`chats w-[40vw] h-full max-md:w-[100vw] max-md:h-full `}>
        <ChatMember userData={userData} setChatSelect={setChatSelect} setSelectedUser={setSelectedUser} setSelectedUserImage={setSelectedUserImage}/>
       </div>:"No contact available..."
       }
      { chatSelect?  <div className={`max-md:w-[100vw] max-md:h-full  w-[65vw] h-full  bg-slate-300 `}>
        <ChatBox setChatSelect={setChatSelect} selectedUser={selectedUser} selectedUserImage={selectedUserImage}/>
       </div>:
        <div className='chatArea w-[56vw] h-full max-md:hidden bg-slate-300 '>
        <ChatThumnail />
       </div>
       }
      
  
       
  
      </div>
    );
  }
  
export default HomePage
