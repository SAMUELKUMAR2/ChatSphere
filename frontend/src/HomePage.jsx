
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

    //Selected UserData
    const [selectedUserData,setSelectedUserData] = useState([]);
    
    return (

    
    <div className={`App  flex w-full h-[100vh]`}>
       {/* <div className={`sidebar w-[5vw] h-full bg-slate-100 `}>
  
        <Sidebar />
       </div> */}
       {userData ?
       <div className={chatSelect?'max-md:hidden w-[40vw] h-full':`chats w-[40vw] h-full max-md:w-[100vw] max-md:h-full `}>
        <ChatMember userData={userData} setChatSelect={setChatSelect} setSelectedUserData={setSelectedUserData} />
       </div>:"No contact available..."
       }
      { chatSelect?  <div className={`max-md:w-[100vw] max-md:h-full  w-[60vw] h-full  bg-slate-300 `}>
        <ChatBox userData={userData} setChatSelect={setChatSelect} selectedUserData={selectedUserData}/>
       </div>:
        <div className='chatArea w-[56vw] h-full max-md:hidden bg-slate-300 '>
        <ChatThumnail />
       </div>
       }
      
  
       
  
      </div>
    );
  }
  
export default HomePage
