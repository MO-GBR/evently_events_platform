import { RegisterUser } from '@/Lib/Actions/UserAction';
import Image from 'next/image';
import React from 'react'
import { FaRegUser, FaLock } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const RegisterPage = () => {
  return (
    <div className='flexBetween w-full'>
        <Image src='/assets/images/sign.jpg' className='img w-[50vw]' alt='banner' width={500} height={500} />
        <div className='w-full flexCenter h-full flex-col'>
            <form className='flex justify-start items-center flex-col w-full h-screen -mt-16' action={RegisterUser}>
                <Image src='/assets/images/logo.svg' className='img w-[200px]' alt='logo' width={200} height={100} />
                <label className='inputContainer g1'>
                    <FaRegUser className='img w-[30px] border-0 p-1 bg-white rounded-full' />
                    <input
                        type='text'
                        placeholder='First Name'
                        className='inputUser'
                        name='firstName'
                    />
                </label>
                <label className='inputContainer g1'>
                    <FaRegUser className='img w-[30px] border-0 p-1 bg-white rounded-full' />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='inputUser'
                        name='lastName'
                    />
                </label>
                <label className='inputContainer g1'>
                    <FaRegUser className='img w-[30px] border-0 p-1 bg-white rounded-full' />
                    <input
                        type='text'
                        placeholder='Userame'
                        className='inputUser'
                        name='username'
                    />
                </label>
                <label className='inputContainer g1'>
                    <MdOutlineMarkEmailRead className='img w-[30px] border-0 p-1 bg-white rounded-full' />
                    <input
                        type='email'
                        placeholder='Your Email'
                        className='inputUser'
                        name='email'
                    />
                </label>
                <label className='inputContainer g1'>
                    <FaLock className='img w-[30px] border-0 p-1 bg-white rounded-full' />
                    <input
                        type='password'
                        placeholder='Password'
                        className='inputUser'
                        name='password'
                    />
                </label>
                <label className='inputContainer g1'>
                    <FaLock className='img w-[30px] border-0 p-1 bg-white rounded-full' />
                    <input
                        type='password'
                        placeholder='Confirm Your Password'
                        className='inputUser'
                        name='confirmPassword'
                    />
                </label>
                <label className='flexCenter g8 p-3 rounded-xl'>
                    <span className='font-bold flexCenter bg-blue-500 p-3 text-white rounded-2xl absolute cursor-pointer text-center w-[300px]'>
                        <Image src="/assets/icons/upload.svg" alt='upload avatar' width={24} height={24} />
                        Upload yor image
                    </span>
                    <input
                        type='file'
                        name='photo'
                    />
                </label>
                <label className='flexCenter flex-col w-[80%]'>
                    <button className='myBtn w-full m-5 font-bold text-white g4 hover:g2' type="submit">Sign Up</button>
                </label>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage