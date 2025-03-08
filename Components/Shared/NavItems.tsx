import React from 'react'
import { headerLinks } from '@/Constants'
import Link from 'next/link'

const NavItems = ({ pathName } : { pathName: string }) => {
  return (
    <nav className='flexCenter w-full'>
        <ul className='flex w-full'>
            {
                headerLinks.map((link, index) => {
                    const isActive = pathName === link.route;
            
                    return (
                        <li key={index} className={`${isActive && "text-primary-500 hover:text-purple-900"} p-medium-16 flexCenter hover:text-gray-600 w-full`}>
                            <Link href={link.route}>{link.label}</Link>
                        </li>
                    )
                })
            }
        </ul>
    </nav>
  )
}

export default NavItems