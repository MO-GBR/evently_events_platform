'use client';

import React from 'react'
import { usePathname } from 'next/navigation'
import { headerLinks } from '@/Constants'
import Link from 'next/link'

const NavItems = () => {
    const pathname = usePathname();
    return (
        <nav className='flexCenter w-full max-md:hidden'>
            <ul className='flex w-full'>
                {
                    headerLinks.map((link, index) => {
                        const isActive = pathname === link.route;
                
                        return (
                            <li key={index} className={`${isActive && "text-purple-600 hover:text-purple-900"} p-medium-16 flexCenter hover:text-gray-600 w-full`}>
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