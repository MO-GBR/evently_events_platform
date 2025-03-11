import Image from 'next/image'
import React from 'react'

const loading = () => {
    return (
        <div className='w-full h-[90vh] overflow-hidden flexCenter'>
            <div className='p-5 bg-violet-700 rounded-full'>
                <Image src="/assets/icons/spinner.svg" alt='loading' width={200} height={200} />
            </div>
        </div>
    )
}

export default loading