'use client'

import { saveEvent } from '@/Lib/Actions/EventActions';
import { useRouter } from 'next/navigation';
import React from 'react'

const SaveEvent = ({ eventId, isSaved }: { eventId: string, isSaved: boolean }) => {
    const router = useRouter();

    const handleClickSave = async () => {
        await saveEvent(eventId, "save");
        router.refresh();
    };

    const handleClickRemove = async () => {
        await saveEvent(eventId, "remove");
        router.refresh();
    };
    return (
        <div>
            {
                isSaved
                    ? (
                        <div className='p-2 px-2 w-[50%] flexCenter text-center m-5 font-bold rounded-3xl bg-green-300 cursor-pointer' onClick={handleClickRemove}>
                            <p className='text-sm font-bold text-white'>Saved</p>
                        </div>
                    ) : (
                        <div className='p-3 px-2 w-[50%] flexCenter text-center m-5 font-bold rounded-3xl bg-red-300 cursor-pointer' onClick={handleClickSave}>
                            <p className='text-sm font-bold text-white'>Save</p>
                        </div>
                    )
            }
        </div>
    )
}

export default SaveEvent