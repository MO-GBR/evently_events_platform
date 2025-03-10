"use server";

import Stripe from 'stripe';
import { connectToDatabase } from "../Database";
import Event, { IEvent } from "../Database/Models/EventModel";
import Order from "../Database/Models/OrderModel";
import User from "../Database/Models/UserModel";
import { handleError, ActionResponse } from "../Utils/responseHandle";
import { getOneEvent } from "./EventActions";
import { getCuttentUser } from "./UserAction";
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from '@/Types';
import { removeDollarSign, subCurrencyPrice } from '../Utils/formatPrice';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const usePrice = removeDollarSign(order.price);

    const price = order.price === 'Free' ? 0 : subCurrencyPrice(usePrice);

    let stripeURL;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: price,
                        product_data: {
                            name: order.eventTitle
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`
        });
    
        stripeURL = session.url!
    } catch (error) {
        handleError(error);
    }

    redirect(stripeURL!);
};

export const createOrder = async (order: CreateOrderParams) => {
    try {
        await connectToDatabase();

        const newOrder = await Order.create({
            ...order,
            event: order.eventId,
            buyer: order.buyerId
        });

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        handleError(error);
    }
};

export const getOrdersByEvent = async ({ searchString, eventId }: GetOrdersByEventParams) => {
    try {
        await connectToDatabase();

        if (!eventId) throw new Error('Event ID is required');

        const eventObjectId = new ObjectId(eventId);

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyer',
                    foreignField: '_id',
                    as: 'buyer'
                }
            },
            {
                $unwind: '$buyer'
            },
            {
                $lookup: {
                  from: 'events',
                  localField: 'event',
                  foreignField: '_id',
                  as: 'event',
                },
            },
            {
                $unwind: '$event',
            },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    eventTitle: '$event.title',
                    eventId: '$event._id',
                    buyer: {
                        $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
                    },
                },
            },
            {
                $match: {
                    $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
                },
            },
        ]);
        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        handleError(error);
    }
};

export const getOrdersByUser = async ({ userId, limit = 3, page }: GetOrdersByUserParams) => {
    try {
        await connectToDatabase();
  
        const skipAmount = (Number(page) - 1) * limit;
        const conditions = { buyer: userId };
  
        const orders = await Order.distinct('event._id').find(conditions).sort({ createdAt: 'desc' }).skip(skipAmount).limit(limit).populate({
            path: 'event',
            model: Event,
            populate: {
                path: 'organizer',
                model: User,
                select: '_id firstName lastName',
            },
        });
  
        const ordersCount = await Order.distinct('event._id').countDocuments(conditions);
  
        return {
            data: JSON.parse(JSON.stringify(orders)),
            totalPages: Math.ceil(ordersCount / limit) 
        }
    } catch (error) {
        handleError(error)
    }
};