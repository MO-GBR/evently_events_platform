import React from 'react'
import { IEvent } from '@/Lib/Database/Models/EventModel'
import Image from 'next/image'
import Link from 'next/link';
import { getUser, getCuttentUser } from '@/Lib/Actions/UserAction';
import DeleteIcon from '../UI/DeleteIcon';

const Ticket = async ({ event }: { event: IEvent }) => {
    const eventCreator = await getUser(event.organizer);
    const currentUser = await getCuttentUser();
    return (
        <div className='rounded-xl border-b shadow flex flex-col m-10 w-fit'>
            <div className='flexCenter bg-black rounded-t-xl'>
                <Image src={event.image} alt='card' width={350} height={200} className='img rounded-t-xl object-cover opacity-35' />
                <p className='text-white text-center absolute w-[300px] font-bold'>{event.title}</p>
            </div>
            <div className='flexAround'>
                <div className='p-2 px-2 w-[20%] text-center m-2 font-bold rounded-3xl text-green-800 bg-green-300 flexCenter'>{event.price}</div>
                <div className='p-2 px-2 w-fit text-center m-2 font-bold rounded-3xl text-gray-800 bg-gray-300 flexCenter'>{event.category}</div>
                <Link href={`/event/${event._id}`} className='p-2 px-3 w-[25%] m-2 rounded-3xl bg-black flexCenter'>
                    <p className='text-white font-bold text-center m-1'>Details</p>
                    <Image src="/assets/icons/arrow.svg" alt='details' width={15} height={15} />
                </Link>
            </div>
        </div>
    )
}

export default Ticket