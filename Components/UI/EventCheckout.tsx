'use client';

import React, { useEffect } from 'react'

import { checkoutOrder } from '@/Lib/Actions/OrderActions'

import Image from 'next/image';

import { IEvent } from '@/Lib/Database/Models/EventModel';

import { createDate } from '@/Lib/Utils/dateAndTime'

import { loadStripe } from '@stripe/stripe-js';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const EventCheckout = ({ startDate, startTime, event, userId }: { startDate: string, startTime: string, event: IEvent, userId: string }) => {
    const isAvailable = createDate(startDate, startTime) > new Date();
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        };
        if (query.get('canceled')) {
            console.log("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, []);

    const onCheckout = async () => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            buyerId: userId
        }
        await checkoutOrder(order);
    };
    return (
        <div>
            {
                userId && userId != 'noUser'
                    ? (
                        <div>
                            {
                                isAvailable
                                    ? (
                                        <form action={onCheckout} method="post">
                                            <button className='myBtn myBtnColored flexCenter' type="submit" role="link">
                                                <div className='bg-white p-1 rounded-full mr-2'><Image src='/assets/icons/link.svg' alt='buy ticket' width={15} height={15}/></div>
                                                { event?.price === 'Free' ? 'Get Ticket' : 'Buy Ticket' }
                                            </button>
                                        </form>
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