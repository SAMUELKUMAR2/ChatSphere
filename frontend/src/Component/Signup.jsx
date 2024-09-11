import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate();

    const [username,setUsername] =useState("");
    const [mobile,setMobile]= useState("");
    const [image,setImage] = useState("");
    const [password,setPassword]= useState("");
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const Submit=async(data)=>{
        await axios.post('http://localhost:8080/admin/signup',{username:username,mobile:mobile,image:image,password:password})
        .then((response)=>{
          
         console.log(response);
         if (response.status===200) {
          
          navigate(`/admin/${response.data._id}`, { state: { userData: response.data } });
        } else {
            setError('Signup failed, please try again.');
          
        }
        })
        .catch((e)=>{
          console.log("Error during signup......",e);
          if(e.response.status===500){
            setError("Username already used.")
          }
          else if(e.response.status===409){
            setError("Mobile already used.")
          }else{
          setError(e.message)
          }
        })
    // console.log(data);
    setUsername("")
    setMobile("")
    setPassword("")
      }
  return (
    <div>
      <form ></form>
        <div className='w-full h-[100vh] bg-blue-400 flex justify-center items-center'>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(Submit)}>
    
        <div class="components">
                            <span>Name:</span>
                            <input class="form-control" type="text" placeholder="Enter your name." {...register("username",{required:true, minLength:{value:3,message:"Minimum 3 characters required"},maxLength:{value:15,message:"characters exceeded "}}) } 
                          value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                            {errors.username && <p className='text-red-700'>{errors.username.message}</p>}
                        </div>
        <div class="components">
                            <span>Mobile:</span>
                            <input class="form-control" type="text" placeholder="Enter your Mobile No." {...register("mobile",{required:true, minLength:{value:10,message:"Minimum 10 characters required"},
                              maxLength:{value:10,message:"characters exceeded "}})} 
                            value={mobile} onChange={(e)=>{setMobile(e.target.value)}} required="true"/>
                            {errors.mobile && <p className='text-red-700'>{errors.mobile.message}</p>}
                        </div>

                        <div class="components">
                            <span>Image:</span>
                            <input class="form-control" type="text" placeholder="image url" value={image} {...register("image")} onChange={(e)=>{setImage(e.target.value)}} />
                        </div>

                <div class="components my-3">
                            <span>Password:</span>
                            <input class="form-control" type="text" placeholder="password" {...register("password",
                              {required:true, minLength:{value:3,message:"Minimum 3 characters required"},
                              maxLength:{value:10,message:"character should be less than 11 "}})} 
                              value={password} onChange={(e)=>{setPassword(e.target.value)}} required="true"/>
                            {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
                        </div>
       <button className='bg-green-200 px-3 py-1 rounded-full' type='submit'>signup</button>
       {error && <p style={{ color: 'red' }}>{error}</p>}
       <p>Already have account? <a className='' href="/login">login</a></p>
        </form>
        
      </div>
    </div>
  )
}

export default Signup