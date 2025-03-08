import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Button = ({ title, href, icon } : { title: string, href: string, icon?: string }) => {
  return (
    <button 
      className='myBtn myBtnColored'
    >
      <Link href={href} className='flexCenter'>
        {
          icon && <div className='bg-white p-1 rounded-full mr-2'><Image src={icon} alt={title} width={15} height={15}/></div>
        }
        <span className='ml-3'>{title}</span>
      </Link>
    </button>
  )
}

export default Button