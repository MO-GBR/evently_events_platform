import Image from 'next/image'
import React from 'react'
import { auth, signOut } from '@/Lib/auth';
import Link from 'next/link';
import { getCuttentUser } from '@/Lib/Actions/UserAction';


const UserButton = async () => {
    const session = await auth();
    const user = session?.user;
    const userDoc = await getCuttentUser();
    return (
        <div className='flexAround w-[20%] max-md:w-[50%] border p-2 rounded-2xl shadow-xl' title={userDoc?.firstName}>
            {
                user
                ? (
                    <>
                        <Link href="/profile">
                            <Image src={userDoc?.photo} alt='Avatar' width={50} height={50} className='rounded-full cursor-pointer' />
                        </Link>
                        <form action={async () => {
                            "use server";
                            await signOut();
                        }}>
                            <button className='font-bold text-gray-800 cursor-pointer border-none outline-none w-fit' type="submit">
                                Sign Out
                            </button>
                        </form>
                    </>
                )
                : (
                    <>
                        <Link className='font-bold text-gray-800 cursor-pointer' href="/login">
                            Sign In
                        </Link>
                    </>
                )
            }
        </div>
    )
}

export default UserButton