import React, { useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


function NewContact() {
    
    const navigate = useNavigate()
    const location = useLocation()
    const { userData } = location.state || {};

    const [name,setName] = useState("");
    // const [image,setImage] = useState("");
    const [mobile,setMobile] = useState("");
    const [error,setError] =useState("")

    const {register,
        handleSubmit,
        formState:{errors}
    } = useForm();
   
    const Submit=async(data)=>{
        await axios.post(`http://localhost:8080/admin/${userData._id}/newuser`,{name:name,mobile:mobile})
         .then((response)=>{

            setName("")
            // setImage("")
            setMobile("")
            console.log(response);

            //Navigate to HomePage
            console.log(userData);

            navigate(`/admin/${userData._id}`,{state:{ userData: userData }})
           
         })
         .catch((error)=>{
           
            if(error?.response?.status===409){
                setError("Mobile Number is Already Added");
            }
           else if(error?.response?.status===404){
                setError("Mobile Number Not Found");
            }
            else{
             setError(error.message);
             }
          
         }) 
   
    }

      
    return (

        <div className='w-[100vw] h-full'>

            <form  onSubmit={handleSubmit(Submit)}  >

                <div class="row" >
                    <div class="col-8 offset-2">
                        <span class="text-3xl offset-2 font-semibold">Add new whatsapp user</span>
                        {/* <div class="components">
                            <span>Username:</span>
                            <input class="form-control" type="text" placeholder="Enter  username." {...register("name",{required:true, minLength:{value:3,message:"Minimum 3 characters required"},maxLength:{value:15,message:"characters exceeded "}}) } 
                          value={name} onChange={(e)=>{setName(e.target.value)}} />
                            {errors.name && <p className='text-red-700'>{errors.name.message}</p>}
                        </div> */}
                        
                        
        <div class="components">
                            <span>Mobile:</span>
                            <input class="form-control" type="text" placeholder="Enter your Mobile No." {...register("mobile",{required:true, minLength:{value:10,message:"Minimum 10 characters required"},
                              maxLength:{value:10,message:"characters exceeded "}})} 
                            value={mobile} onChange={(e)=>{
                                setError("")
                                setMobile(e.target.value)
                                }} required="true"/>
                            {errors.mobile && <p className='text-red-700'>{errors.mobile.message}</p>}
                        </div>

                        <div class="mt-3">
                            <button class="btn btn-success" type="submit">Add</button>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                    </div>
                </div>
            </form>
          
        </div>
    )
}

export default NewContact
