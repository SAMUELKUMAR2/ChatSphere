import React from 'react'

function ChatThumnail() {


  return (
    <>
      <div className=' w-full  h-full flex flex-col justify-center items-center '>
      
      
      <div>
      <img className='w-72 h-56 self-center' src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669aeJeom.png" alt="pic" />
      </div>
      <div className='flex flex-col items-center mx-6'>
     <span className='mt-3  text-slate-700 text-4xl font-thin'>Download Whatsapp for Windows</span>
     <span className='mt-5 text-slate-600 text-xl font-thin'>Make calls,share your screen and get a faster experience when you download the windows app.</span>

    <button className='w-fit mt-6 self-center py-3 px-3 bg-green-900 rounded-full text-white'>Get from Microsoft Store</button>
     
     </div>
   
     
   
      </div>
    </>
  )
}

export default ChatThumnail
