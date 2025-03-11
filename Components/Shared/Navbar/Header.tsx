import Image from 'next/image'
import React from 'react'
import NavItems from './NavItems';
import UserButton from './UserButton'

import { auth } from '@/Lib/auth';

import Link from 'next/link';
import MobileMenu from './MobileMenu';

const Header = async () => {

  const session = await auth();
  const user = session?.user;

  return (
    <header className='w-full border-b border-b-gray-300 g6'>
        <div className='flexBetween wrapper'>
          <Link href="/">
            <Image src="/assets/images/logo.svg" className='img' width={128} height={38} alt='logo' />
          </Link>
          {user && (
            <>
              <NavItems />
              <MobileMenu />
            </>
          )}
          <UserButton />
        </div>
    </header>
  )
}

export default Header