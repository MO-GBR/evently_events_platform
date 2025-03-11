import Button from '@/Components/UI/Button'
import { getCuttentUser } from '@/Lib/Actions/UserAction'
import { formatMongoDate } from '@/Lib/Utils/dateAndTime';
import Image from 'next/image';
import { PageProps } from '@/Types';
import React from 'react'
import { getEventsByUser, getOneEvent } from '@/Lib/Actions/EventActions';
import { getOrdersByUser } from '@/Lib/Actions/OrderActions';
import { IOrder } from '@/Lib/Database/Models/OrderModel';
import Collection from '@/Components/Shared/Collection';

const Profile = async ({ searchParams }: PageProps) => {
    const search = await searchParams;

    const currentUser = await getCuttentUser();
    const user = JSON.parse(JSON.stringify(currentUser));
    const joinedAt = formatMongoDate(user?.createdAt);

    const ordersPage = Number(search?.ordersPage) || 1;
    const eventsPage = Number(search?.eventsPage) || 1;

    const orders = await getOrdersByUser({ userId: user._id, page: ordersPage });

    const orderedEvents = orders?.data.map((order: IOrder) => order?.event) || [];
    const organizedEvents = await getEventsByUser({ userId: user._id, page: eventsPage });
    console.log(organizedEvents);
    
    return (
        <>
            <section className='bg-violet-100 w-full flexCenter'>
                <div className='bg-slate-200 border border-gray-400 rounded-xl shadow-xl flex justify-start items-center p-5 m-5'>
                    <Image src={user?.photo} width={100} height={100} className='img rounded-full' alt='avatar' />
                    <div className='m-3'>
                        <div className='flex items-center justify-start'>
                            <p className='font-bold'>Name:</p>
                            <p className='ml-2 text-gray-700'>{`${user?.firstName} ${user?.lastName == undefined ? '' : user?.lastName}`}</p>
                        </div>
                        <div className='flex items-center justify-start'>
                            <p className='font-bold'>username:</p>
                            <p className='ml-2 text-gray-700'>{`@${user?.username}`}</p>
                        </div>
                        <div className='flex items-center justify-start'>
                            <p className='font-bold'>Joined At:</p>
                            <p className='ml-2 text-gray-700'>{`${joinedAt.timeDate}`}</p>
                        </div>
                        <div className='m-3'>
                            <Button title='Show Saved Posts' icon='/assets/icons/link.svg' href='/saved' />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='wrapper flexCenter flex-col'>
                    <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                    <div className='my-3'>
                        <Button title='Explore More Events' href='/' />
                    </div>
                </div>
            </section>
            <section className="wrapper my-8">
                <Collection
                    data={orderedEvents}
                    emptyTitle="No event tickets purchased yet"
                    emptyStateSubtext="No worries - plenty of exciting events to explore!"
                    limit={3}
                    page={ordersPage}
                    urlParamName="ordersPage"
                    totalPages={orders?.totalPages}
                    collectionType='tickets'
                />
            </section>
            <section>
                <div className='wrapper flexCenter flex-col'>
                    <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
                    <div className='my-3'>
                        <Button title='Create New Event' href='/event/create' />
                    </div>
                </div>
            </section>
            <section className="wrapper my-8">
                <Collection
                    data={organizedEvents?.data}
                    emptyTitle="No events have been created yet"
                    emptyStateSubtext="Go create some now"
                    limit={3}
                    page={eventsPage}
                    urlParamName="eventsPage"
                    totalPages={organizedEvents?.totalPages}
                    collectionType='cards'
                />
            </section>
        </>
    )
}

export default Profile