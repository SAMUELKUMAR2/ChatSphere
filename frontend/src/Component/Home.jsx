import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  return (
    <>
        <div className='w-full h-[100vh] bg-slate-100 p-4'>
          <div className='flex gap-3 '>
          <button className='bg-green-500 text-white rounded-full px-3  transition-transform duration-300 hover:scale-125'
          onClick={()=>{ navigate("/login") }}
          >Login</button>

          <button className='bg-blue-500 text-white rounded-full px-3  transition-transform duration-300 hover:scale-125'
          onClick={()=>{ navigate("/admin/signup") }}
          >signup</button>
          </div>
            <h1>Home Page</h1>
            
        </div>
    </>
  )
}

export default Home