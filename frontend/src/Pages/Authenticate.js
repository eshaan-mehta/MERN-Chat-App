import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import clsx from "clsx";

import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Footer from '../Components/Footer';

const Authenticate = () => {
    const [page, setPage] = useState("login");

  return (
    <div className='flex justify-center w-screen h-screen'>
        <div className='fixed p-3 text-4xl font-semibold top-2 left-3 text-primary'>
            <Link to='/'>ChatTime</Link>
        </div>

        <div className='fixed top-[7.5rem] sm:top-[6rem] w-[42rem] max-w-[82.5%] bg-light rounded-2xl'>
            <div className='flex w-full mt-3 h-[4rem] justify-center items-center font-bold text-2xl md:text-3xl text-primary text-center gap-4 px-2'>
                <div
                    onClick={() => setPage("login")}
                    className={clsx('w-[50%] py-2 rounded-2xl cursor-pointer transition-all ', {"bg-gray-200" : page === 'login'})}
                >
                    Log In
                </div>
                <div
                    onClick={() => setPage("signup")}
                    className={clsx('w-[50%] py-2 rounded-2xl cursor-pointer transition-all', {"bg-gray-200" : page === 'signup'})}   
                >
                    Sign Up
                </div>
               
            </div>

              <div className='mt-6'>
            {(page === "login") ? (
                <Login />
            ) : (
                <Signup />
            )}
              </div>
        </div>

        <Footer />
    </div>
  )
}

export default Authenticate;
