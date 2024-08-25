import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom'



function LoginPage() {
  const navigate = useNavigate();
  const [mobile,setMobile]= useState("");
  const [password,setPassword]= useState("");
  const [error, setError] = useState('');
  
  const {register,handleSubmit,
    formState:{errors}

  } = useForm();

  const Submit=async(data)=>{
     await axios.post('http://localhost:8080/login',{mobile:mobile,password:password})
    .then((response)=>{
      console.log(response);
       if (response.status===200) {
          //HomePage
          navigate(`/admin/${response.data._id}`, { state: { userData: response.data } });
        } else {
          setError('Login failed, please try again.');
        }
    })
    .catch((e)=>{
      console.log("Error.........",e)
      if(e.response.status===404){
        setError("   User Not found");
      }
      else{
        setError('Login failed, please try again.');
      }
      
    })
// console.log(data);
setMobile("")
  
  }
  return (
    <div >
      
      
      <div className='w-full h-[100vh] bg-blue-400 flex justify-center items-center'>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(Submit)}>

        <div class="components">
                            <span>Mobile:</span>
                            <input class="form-control" type="text" placeholder="Enter your Mobile No." {...register("mobile",{required:true, minLength:{value:10,message:"Minimum 10 characters required"},
                              maxLength:{value:10,message:"characters exceeded "}})} 
                            value={mobile} onChange={(e)=>{setMobile(e.target.value)}} required="true"/>
                            {errors.mobile && <p className='text-red-700'>{errors.mobile.message}</p>}
                        </div>

                        <div class="components my-3">
                            <span>Password:</span>
                            <input class="form-control" type="text" placeholder="password" {...register("password",
                              {required:true, minLength:{value:3,message:"Minimum 3 characters required"},
                              maxLength:{value:10,message:"character should be less than 11 "}})} 
                              value={password} onChange={(e)=>{setPassword(e.target.value)}} required="true"/>
                            {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
                        </div>
       <button className='bg-green-200 px-3 rounded-full' type='submit'>Login</button>
       {error && <p style={{ color: 'red' }}>{error}</p>}
       <p>New user ? <a href="/admin/signup">signup</a></p>
        </form>
        
      </div>

     
    </div>
  )
}

export default LoginPage
