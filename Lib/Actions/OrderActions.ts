'use server'

import { connectToDatabase } from "../Database";
import Order from "../Database/Models/OrderModel";
import { handleError, ActionResponse } from "../Utils/responseHandle";
import { getOneEvent } from "./EventActions";
import { getCuttentUser } from "./UserAction";

export const createOrder = async ({eventId, payment}: {eventId: string, payment: string}, formData: FormData) => {
    const user = await getCuttentUser();
    const event = await getOneEvent(eventId);

    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    try {
        if(event?.price !== 'Free') {
            if(!payment) throw new Error("Payment Required");
        };

        await connectToDatabase();

        const newOrder = await Order.create({
            phone,
            address,
            totalAmount: event.price,
            event: event._id,
            buyer: user._id
        });

        const data = new ActionResponse(220, newOrder);
        console.log(data);
    } catch (error) {
        handleError(error);
    }
};