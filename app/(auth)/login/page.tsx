import { login } from '@/Lib/Actions/UserAction';
import { signIn, auth } from '@/Lib/auth'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import Image from 'next/image'

const LoginPage = async () => {
  const session = await auth();
  const user = session?.user;
  if(user) redirect("/");
  return (
    <div className='allScreen flexCenter'>
        <div className='w-[300px] h-[350px] border border-gray-600 absolute flexCenter flex-col bg-white/30 rounded-3xl shadow-2xl backdrop-blur-sm'>
          <form action={login} className='flexCenter flex-col w-full'>
            <Image src='/assets/images/logo.svg' className='img w-[100px]' width={100} height={50} alt='logo' />
            <label className='border border-gray-400 p-2 w-[95%] m-2 rounded-3xl shadow-xl g6'>
              <input
                className='border-none outline-none w-full bg-transparent'
                placeholder='your email'
                name='email'
                type='email'
              />
            </label>
            <label className='border border-gray-400 p-2 w-[95%] m-2 rounded-3xl shadow-xl g6'>
              <input
                className='border-none outline-none w-full bg-transparent'
                placeholder='your password'
                name='password'
                type='password'
              />
            </label>
            <button className='myBtn flex justify-around items-center w-[80%] g5 hover:g3 m-2 text-white font-bold border border-green-200' type="submit">
              Sign In
            </button>
          </form>
          <form className='flexCenter w-full' action={async () => {
            "use server";
            await signIn("google");
          }}>
            <button className='myBtn flex justify-around items-center w-[80%] g4 hover:g2 m-2 text-white font-bold border border-green-200' type="submit">
              <Image src='assets/images/google.png' className='img w-[30px]' alt="google" width={30} height={30}/>
              Sign In with google
            </button>
          </form>
          <Link href="/register" className='myBtn flex justify-around items-center w-[80%] bg-violet-700 hover:bg-violet-500 text-white font-bold border border-violet-900'>
            Create Account
          </Link>
        </div>
        <Image src='assets/images/hero.png' className='img w-[30vw]' alt='hero' width={500} height={500} />
    </div>
  )
}

export default LoginPage