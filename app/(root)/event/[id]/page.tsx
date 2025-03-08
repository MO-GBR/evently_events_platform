import { getOneEvent } from '@/Lib/Actions/EventActions';
import { getUser } from '@/Lib/Actions/UserAction';
import { myTimestamp } from '@/Lib/Utils/dateAndTime';
import Image from 'next/image'
import React from 'react';
import CommentSection from '@/Components/Shared/CommentSection';
import EventCheckout from '@/Components/UI/EventCheckout';


const Event = async ({ params }: { params: Promise<{id: string}> }) => {
    const { id } = await params
    const event = await getOneEvent(id);

    const start = myTimestamp(event?.startDate, event?.startTime);
    const end = myTimestamp(event?.endDate, event?.endTime);

    const time = `${start.dateOnly} / ${start.timeOnly}-${end.timeOnly}`;

    const organizer = await getUser(event?.organizer);

    const eventData = JSON.parse(JSON.stringify(event));

    return (
        <div className='w-full flexCenter flex-col'>
            <div className='flex justify-center items-start w-full'>
                <Image src={event?.image} width={400} height={400} alt="event banner" className='m-5 rounded-2xl' />
                <div className='ml-5'>
                    <h1 className='h3-bold'>
                        {event?.title}
                    </h1>
                    <div className='flex flex-col items-start'>
                        <p className='font-bold'>Description:</p>
                        <p className='w-[300px]'>{event?.description}</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='p-2 px-2 w-[20%] text-center m-2 font-bold rounded-3xl text-green-800 bg-green-300'>{event?.price}</div>
                        <div className='p-2 px-2 w-[20%] text-center m-2 font-bold rounded-3xl text-gray-800 bg-gray-300'>{event?.category}</div>
                        <p className='font-bold mr-3'>By</p>
                        <p className='w-full'>{`${organizer.firstName} ${organizer?.lastName == undefined ? '' : organizer?.lastName}`}</p>
                    </div>
                    <div className='p-[1px] w-[80%] bg-gray-500 opacity-50 my-5' />
                    <EventCheckout startDate={event?.startDate} startTime={event?.startTime} eventId={event?._id} />
                    <div>
                        <div className='flex items-center'>
                            <Image src="/assets/icons/calendar.svg" alt="calendar" width={20} height={20} className='img w-[20px] m-3' />
                            <p>{time}</p>
                        </div>
                        <div className='flex items-center'>
                            <Image src="/assets/icons/location.svg" alt="calendar" width={20} height={20} className='img w-[20px] m-3' />
                            <p>{event?.location}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-start'>
                        <p className='font-bold'>About this Event:</p>
                        <p className='w-[70%]'>{event?.details}</p>
                    </div>
                </div>
            </div>
            <div className='p-[1px] w-[90%] bg-gray-500 opacity-25 m-10' />
            <CommentSection event={eventData} />
        </div>
    )
}

export default Event