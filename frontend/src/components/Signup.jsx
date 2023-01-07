import React,{useState, useEffect} from 'react'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {BsFillPersonFill} from 'react-icons/bs'
import {FaRegEnvelope} from 'react-icons/fa'
import {MdLockOutline} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../Actions/User";

import userImage from "../data/user.png"

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.user)

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");


  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () =>{
        if(reader.readyState===2){
            setAvatar(reader.result)
        }
    }
  };


  const handleSignup =async (e) => {
    e.preventDefault();
    await dispatch(registerUser(name,email,password,avatar))
    navigate('/')
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };


  useEffect(()=>{
    if(error){
        toast.error(error)
        dispatch({type:"clearErrors"})
    }
  },[error, dispatch])

  return (
    <>
    <div className="mt-16  bg-white">
      <div className='w-full flex flex-col md:flex-row min-h-[80vh] items-center justify-center flex-1 text-center '>

      <div className='w-full py-8 md:w-3/5'>
            <div className='items-center flex flex-col justify-center'>
                <h2 className='text-3xl font-bold text-green-700 mb-8'>Create new account</h2>

                {/* Input Divs below */}
                <form onSubmit={handleSignup} className='flex flex-col items-center '>

                    <img src={avatar || userImage} alt="Product" className='h-[13rem] w-[13rem] mb-4 object-cover rounded-full' />
                    <input type="file" accept="image/*" onChange={handleImageChange} />

                    <div className='bg-gray-100 mt-8 w-64 p-2 flex items-center mb-3'>
                        <BsFillPersonFill className='text-gray-400 m-2' />
                        <input type='text' name='name' value={name} onChange={handleNameChange} placeholder="Name" className='bg-gray-100 outline-none text-sm flex-1' />
                        {/* using flex-1 above to expand full width */}
                    </div>
                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                        <FaRegEnvelope className='text-gray-400 m-2' />
                        <input type='email' name='email' value={email} onChange={handleEmailChange} placeholder="Email" className='bg-gray-100 outline-none text-sm flex-1' />
                        {/* using flex-1 above to expand full width */}
                    </div>
                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                        <MdLockOutline className='text-gray-400 m-2' />
                        <input type='password' name='password' value={password} onChange={handlePassChange} placeholder="Password" className='bg-gray-100 outline-none text-sm flex-1' />
                        {/* using flex-1 above to expand full width */}
                    </div>
                    <div className='flex justify-between w-64 mb-5'>
                        <a href='/login' className='text-xs hover:cursor-pointer'>Already have an account? Login</a>
                    </div>
                    <button type='submit' disabled={loading} className={`border-2 border-green-800 ${loading? "bg-red-200": ""} text-green-800 font-semibold rounded-full px-12 py-2 inline-block hover:bg-green-800 hover:text-white hover:cursor-pointer`}>Signup</button>
                </form>
            </div>
      </div>

      </div>
    </div>
    <ToastContainer /> 
    </>
  )
}

export default Signup