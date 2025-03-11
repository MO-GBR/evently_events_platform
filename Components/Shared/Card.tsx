import { getUser, getCuttentUser } from '@/Lib/Actions/UserAction';
import { myTimestamp } from '@/Lib/Utils/dateAndTime';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { IEvent } from '@/Lib/Database/Models/EventModel'
import DeleteIcon from '../UI/DeleteIcon';
import SaveEvent from '../UI/SaveEvent';

const Card = async ({ event }: { event: IEvent }) => {
  const eventTime = myTimestamp(event.startDate, event.startTime);
  const eventCreator = await getUser(event.organizer);
  const currentUser = await getCuttentUser();

  const isSaved = currentUser && currentUser.savedPosts.includes(event._id);

  return (
    <div className='rounded-xl border-b shadow flex flex-col m-10 w-fit'>
        <div className='flex justify-end'>
          <Image src={event.image} alt='card' width={350} height={200} className='img rounded-t-xl object-cover' />
          {
            currentUser &&
            (eventCreator.username === currentUser.username && (
              <div className='absolute m-2 bg-white p-1 rounded-xl'>
                <Link className='mb-1' href={`/event/update/${event._id}`}>
                  <Image src="/assets/icons/edit.svg" alt='update' width={24} height={24} />
                </Link>
                <DeleteIcon eventId={event._id} />
                <Link className='mb-1' href={`/orders/${event._id}`}>
                  <div className='p-1 bg-gray-800 rounded-full'>
                    <Image src="/assets/icons/logo-grey.svg" alt='orders' width={17} height={17} />
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
        <div className='flex justify-start rounded-t-xl'>
          <div className='p-2 px-2 w-[20%] text-center m-2 font-bold rounded-3xl text-green-800 bg-green-300 flexCenter'>{event.price}</div>
          <div className='p-2 px-2 w-fit text-center m-2 font-bold rounded-3xl text-gray-800 bg-gray-300 flexCenter'>{event.category}</div>
          <Link href={`/event/${event._id}`} className='p-2 px-3 w-fit m-2 rounded-3xl bg-black flexCenter'>
            <p className='text-white font-bold text-center m-1'>Details</p>
            <Image src="/assets/icons/arrow.svg" alt='details' width={15} height={15} />
          </Link>
        </div>
        <p className='text-gray-700 font-bold m-2'>
          {eventTime.timeDate}
        </p>
        <p className='p-medium-20 m-2'>{event.title}</p>
        <div className='w-full h-[60px] m-2 flex flex-col justify-end'>
          <div className='flexAround w-full'>
            <p className='p-bold-16 text-gray-900 w-full'>{`${eventCreator.firstName} ${eventCreator?.lastName == undefined ? '' : eventCreator?.lastName}`}</p>
            {currentUser && <SaveEvent eventId={event._id} isSaved={isSaved} />}
          </div>
        </div>
    </div>
  )
}

export default Card