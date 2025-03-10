import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from "@/Lib/Actions/OrderActions";

export const POST = async (request: Request) => {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature') as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    console.log("body >>>>>> ", body, "sig >>>>>> ", sig, "endpointSecret >>>>>>> ", endpointSecret);

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        console.log("event >>>>> ", event);
    } catch (error) {
        return NextResponse.json({ message: 'Webhook error', error: error });
    };

    const eventType = event.type;

    if(eventType === 'checkout.session.completed') {
        const { id, amount_total, metadata } = event.data.object;

        const order = {
            stripeId: id,
            eventId: metadata?.eventId || '',
            buyerId: metadata?.buyerId || '',
            totalAmount: amount_total ? `$${(amount_total / 100).toString()}`: '0'
        };

        const newOrder = await createOrder(order);
        console.log('OK >>> ', newOrder);
        return NextResponse.json({ message: 'OK', order: newOrder });
    };

    return new Response('', { status: 200 });
};