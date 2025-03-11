import Search from '@/Components/Shared/Search';
import { getOrdersByEvent } from '@/Lib/Actions/OrderActions';
import { getCuttentUser, getUser } from '@/Lib/Actions/UserAction';
import { getOneEvent } from '@/Lib/Actions/EventActions';
import { IOrderItem } from '@/Lib/Database/Models/OrderModel';
import { formatDateTime } from '@/Lib/Utils/dateAndTime';
import { price } from '@/Lib/Utils/formatPrice';
import { PageProps } from '@/Types'
import React from 'react'
import NotAllowed from '@/Components/UI/NotAllowed';

const Orders = async ({ params, searchParams }: PageProps) => {
    const { id } = await params;
    const search = await searchParams;

    const event = await getOneEvent(id);
    const user = await getCuttentUser();
    const eventOrganizer = await getUser(JSON.parse(JSON.stringify(event.organizer)))

    const eventId = id as string;
    const searchText = (search?.query as string) || '';

    const orders = await getOrdersByEvent({ eventId, searchString: searchText });

    if(user.username !== eventOrganizer.username) return <NotAllowed />
    return (
        <>
            <section>
                <div className='bg-violet-200'>
                    <h3 className="wrapper h3-bold text-center sm:text-left ">Orders</h3>
                </div>
            </section>
            <section className='wrapper'>
                <Search placeholder="Search buyer name..." />
            </section>
            <section className='wrapper overflow-x-auto'>
                <table className='w-full border-collapse border-t'>
                    <thead>
                        <tr className='p-medium-14 border-b text-grey-500'>
                            <th className="min-w-[250px] py-3 text-left">Order ID</th>
                            <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Event Title</th>
                            <th className='min-w-[150px] py-3 text-left'>Buyer</th>
                            <th className='min-w-[100px] py-3 text-left'>Created At</th>
                            <th className='min-w-[100px] py-3 text-left'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders && orders.length === 0 ? (
                                <tr className='border-b'>
                                    <td colSpan={5} className="py-4 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {
                                        orders && (
                                            orders.map((row: IOrderItem) => (
                                                <tr
                                                    key={row._id}
                                                    className="p-regular-14 lg:p-regular-16 border-b"
                                                    style={{ boxSizing: 'border-box' }}
                                                >
                                                    <td className='min-w-[250px] py-4 text-violet-600'>{row._id}</td>
                                                    <td className="min-w-[200px] flex-1 py-4 pr-4">{row.eventTitle}</td>
                                                    <td className="min-w-[150px] py-4">{row.buyer}</td>
                                                    <td className="min-w-[100px] py-4">
                                                        {
                                                            formatDateTime(row.createdAt).timeDate
                                                        }
                                                    </td>
                                                    <td className="min-w-[100px] py-4 text-right">
                                                        {
                                                            price(row.totalAmount)
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Orders