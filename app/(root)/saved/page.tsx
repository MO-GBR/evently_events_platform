import Card from '@/Components/Shared/Card'
import { getOneEvent, saveEvent } from '@/Lib/Actions/EventActions'
import { getCuttentUser } from '@/Lib/Actions/UserAction'
import { handleJSON } from '@/Lib/Utils/responseHandle';

import React from 'react'

const SavedPosts = async () => {
    const currentUser = await getCuttentUser();
    const allSavedPosts = handleJSON(currentUser?.savedPosts);
    return (
        <div className='overflow-x-hidden'>
            {
                allSavedPosts.length > 0 ? (
                    <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                        {
                            allSavedPosts.map(async (eventId: string, index: any) => {
                                const eventData = await getOneEvent(eventId);
                                if(!eventData) await saveEvent(eventId, "remove");
                                const event = JSON.parse(JSON.stringify(eventData));
                                return (
                                    <Card event={event} />
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className='allScreen flexCenter max-md:text-center'>
                        <h1 className='h2-bold'>There is no saved events</h1>
                    </div>
                )
            }
        </div>
    )
}

export default SavedPosts