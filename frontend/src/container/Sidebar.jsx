import React from 'react'
import m1 from '../image/message-solid.svg';
import m2  from '../image/channel.png';
import m3  from '../image/comment-solid.svg'
import setting  from '../image/setting.png'
import profile  from '../image/profile.png'
function Sidebar() {
  return (
   <div className='m-3 w-[98%] h-[96%] '>
     <div className=' w-full h-full flex flex-col justify-between   '>
        {/*top icon  */}
   <div className='flex flex-col gap-4'>
   <div className='p-2 w-[55%] rounded-full bg-slate-300'>
        <img className=" " src={m1} alt="" />
      </div>
      <div className='p-2 w-[55%]'>
      <img className=" " src={m2} alt="" />
      </div>
      <div className='p-2 w-[55%]'>
      <img className=" " src={m3} alt="" />
      </div>
   </div>

      {/* bottom icons */}
      <div className='flex flex-col gap-4 '>
        <div className='p-2 w-[55%]'>
        <img src={setting} alt="" />
        </div>
        <div className='p-2 bg-white rounded-full w-[55%]'>
            <img src={profile} alt="" />
        </div>
      </div>
    </div>
   </div>
  )
}

export default Sidebar
