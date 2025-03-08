import { createDate } from '@/Lib/Utils/dateAndTime'
import { getCuttentUser } from '@/Lib/Actions/UserAction'
import React from 'react'
import Button from './Button';
// { startDate, startTime }: { startDate: string, startTime: string }
const EventCheckout = async ({ startDate, startTime, eventId }: { startDate: string, startTime: string, eventId: string }) => {
    const isAvailable = createDate(startDate, startTime) > new Date();
    const currentUser = await getCuttentUser();
    return (
        <div>
            {
                currentUser
                    ? (
                        <div>
                            {
                                isAvailable
                                    ? (
                                        <div>
                                            <Button title='Buy Ticket' href={`/order/${eventId}`} icon='/assets/icons/link.svg' />
                                        </div>
                                    ) : (
                                        <div className='w-[50%] bg-red-400 m-1 rounded-xl p-5'>
                                            <p className='text-red-700 font-bold'>This Event is not available right now !</p>
                                        </div>
                                    )
                            }
                        </div>
                    ) : (
                        <div className='w-[50%] bg-red-400 m-1 rounded-xl p-5'>
                            <p className='text-red-700 font-bold'>You need to sign in to buy a ticket</p>
                        </div>
                    )
            }
        </div>
    )
}

export default EventCheckout