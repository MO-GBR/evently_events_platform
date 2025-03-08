'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { deleteEvent } from '@/Lib/Actions/EventActions'

const DeleteIcon = ({ eventId }: { eventId: string }) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = async () => {
        await deleteEvent({eventId, path: pathname});
        router.refresh();
    };
    return (
        <div className='cursor-pointer' onClick={handleClick}>
            <Image src="/assets/icons/delete.svg" alt='update' width={24} height={24} />
        </div>
    )
}

export default DeleteIcon