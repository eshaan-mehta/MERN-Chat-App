import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import clsx from 'clsx';

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useChatContext } from '../Context/ChatProvider';

const Signup = () => {
  const { user, setUser } = useChatContext()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!name || !email || !password) {
      setLoading(false); 
      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };

    axios.post(
      "http://localhost:8080/api/user",
      {
        name,
        email,
        password
      },
      config
    )
    .then((response) => {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setLoading(false);
      setUser(response.data);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error)
      setErrorMessage(error.response.data.error); // narrowed down from console logs
    })
  }

  useEffect(() => { 
    if (user) {
      navigate('/chats');
    }
  }, [user]);

  return (
    <div className='flex flex-wrap w-full p-2 md:flex-nowrap '>
      <form className='flex-col justify-center w-full px-5 mb-5' onSubmit={(e) => handleSubmit(e)}>
        <input 
          id="Name"
          className='h-[3rem] rounded-[0.55rem] border-2 border-primary bg-white pl-3 w-full mb-10 '
          type='text'
          required
          placeholder={"Full Name"}
          onChange={(e) => setName(e.target.value)}
        />

        <input 
          id="Email"
          className='h-[3rem] rounded-[0.55rem] border-2 border-primary bg-white pl-3 w-full mb-10'
          type='email'
          required
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className={clsx('relative items-center', {[`mb-${errorMessage? '3' : '10'}`] : true })}>
          <input 
            id="Password"
            className='h-[3rem] rounded-[0.55rem] border-2 border-primary bg-white pl-3 w-full '
            type={showPassword? 'text': 'password'}
            required
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-4 text-xl top-[0.875rem]'>
            {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
          </button>
        </div>

        {/* <div className='items-center inline-block w-full gap-4 mb-6 '>
          <h1 className='mb-2 font-semibold text-gray-900'>Profile Picture</h1>
          <input
            id="Pic"
            className='h-[3rem] border-2pl-3'
            type='file'
            accept='image/*'
            placeholder='Profile Picture'
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div> */}

        {errorMessage && 
        <h1 className='mb-5 font-medium text-center text-red-500'>
          {errorMessage}  
        </h1>}
        
        
        <div className='flex justify-center'>
          <button 
            type='submit'
            disabled={loading}
            className='bg-primary text-white font-bold p-3 rounded-2xl w-[15rem] hover:scale-105 transition-all disabled:scale-100 disabled:bg-gray-400'
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup;
