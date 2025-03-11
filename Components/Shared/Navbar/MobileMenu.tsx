'use client';

import { usePathname } from 'next/navigation'
import { headerLinks } from '@/Constants'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";

const MobileMenu = () => {
    const [ toggle, setToggle ] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const pathname = usePathname();

    return (
        <nav className='hidden w-full max-md:flexCenter max-md:flex-col'>
            <div className='bg-white p-1 rounded-full cursor-pointer w-fit' onClick={handleToggle}>
                <IoIosMenu className='img w-[30px]' />
            </div>
            {
                toggle && (
                    <ul className='w-full max-md:flex-col max-md:absolute max-md:top-28 max-md:g8 max-md:p-5 max-md:rounded-2xl max-md:shadow-xl max-md:w-[80%]'>
                        {
                            headerLinks.map((link, index) => {
                                const isActive = pathname === link.route;
                        
                                return (
                                    <li key={index} className={`${isActive && "text-purple-600 hover:text-purple-900"} p-medium-16 flexCenter hover:text-gray-600 w-full max-md:my-5`}>
                                        <Link href={link.route}>{link.label}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </nav>
    )
}

export default MobileMenu