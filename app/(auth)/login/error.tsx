"use client"

import React from 'react'
import Image from 'next/image'

const error = () => {
    const refreshPage = () => {
        window.location.reload();
    };
    return (
        <div className='w-full h-screen flexCenter'>
            <div className='flexCenter flex-col h-[70vh] w-[50vw] border border-gray-400 shadow-xl rounded-2xl'>
                <Image src='/assets/images/logo.svg' className='img w-[200px] m-5' alt='logo' width={200} height={100} />
                <p className='text-2xl font-bold text-start'>Somthing went wrong while signing try to:</p>
                <ul className='p-5 m-5'>
                    <li>1. Write your correct email</li>
                    <li>2. Write your correct password</li>
                    <li>3. Make sure that you have created your account</li>
                </ul>
                <button className='myBtn flex justify-around items-center w-[80%] g5 hover:g3 m-2 text-white font-bold border border-green-200 p-3' onClick={refreshPage}>
                    Click Hete To Try Again
                </button>
            </div>
        </div>
    )
}

export default error