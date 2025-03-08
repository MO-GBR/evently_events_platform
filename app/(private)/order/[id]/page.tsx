import { getOneEvent } from '@/Lib/Actions/EventActions';
import React from 'react'

const CheckoutOrder = async ({ params }: { params: Promise<{id: string}> }) => {
    const { id } = await params;
    const event = await getOneEvent(id);
    return (
        <div className='w-full h-screen flexCenter'>
            <div className='w-[80vw] h-[95vh] p-5 bg-gray-200 border border-gray-100 rounded-xl shadow-xl'>
                Order
            </div>
        </div>
    )
}

export default CheckoutOrder