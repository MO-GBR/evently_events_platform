import Image from 'next/image'
import React from 'react'
import NavItems from './NavItems';
import UserButton from './UserButton'

import { auth } from '@/Lib/auth';

import { headers } from "next/headers";

const Header = async () => {

  const session = await auth();
  const user = session?.user;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  return (
    <header className='w-full border-b border-b-gray-300 g6'>
        <div className='flexBetween wrapper'>
          <Image src="/assets/images/logo.svg" className='img' width={128} height={38} alt='logo' />
          {user && (<NavItems pathName={pathname!} />)}
          <UserButton />
        </div>
    </header>
  )
}

export default Header