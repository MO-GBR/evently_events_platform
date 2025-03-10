"use server";

import { GetAllEventsParams, DeleteEventParams, GetEventsByUserParams } from "@/Types";
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from "../Database";
import Event from "../Database/Models/EventModel";
import User from "../Database/Models/UserModel";
import { ActionResponse, handleError } from "../Utils/responseHandle";
import { getCuttentUser, getUser } from "./UserAction";
import { categories } from "@/Constants";
import { redirect } from "next/navigation";

export const createEvent = async (imgURL: string, formData: FormData) => {
    const user = await getCuttentUser();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const details = formData.get("details") as string;
    const location = formData.get("location") as string;

    const price = formData.get("price") as string;
    const category = formData.get("category") as string;

    const startTime = formData.get("startTime") as string;
    const startDate = formData.get("startDate") as string;

    const endTime = formData.get("endTime") as string;
    const endDate = formData.get("endDate") as string;

    try {
        if(!title || !description || !location || !startDate || !startTime || !endTime || !endDate || !price) throw new Error("All Fields Are Required");

        await connectToDatabase();

        const organizer = await User.findById(user._id);
        if (!organizer) throw new Error('Organizer not found');
        
        const newEvent = await Event.create({
            title,
            description,
            location,
            image: imgURL,
            price,
            startTime,
            startDate,
            endTime,
            endDate,
            category,
            details,
            organizer: user._id
        });

        const data = new ActionResponse(200, newEvent);
        console.log(data);
    } catch (error) {
        handleError(error);
    }
};

export const getOneEvent = async (id: string) => {
    try {
        const event = await Event.findById(id);
        return event;
    } catch (error) {
        handleError(error);
    }
};

export const updateEvent = async ({ eventId, imgURL }: { eventId: string, imgURL: string }, formData: FormData) => {
    const user = await getCuttentUser();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const details = formData.get("details") as string;
    const location = formData.get("location") as string;

    const price = formData.get("price") as string;
    const category = formData.get("category") as string;

    const startTime = formData.get("startTime") as string;
    const startDate = formData.get("startDate") as string;

    const endTime = formData.get("endTime") as string;
    const endDate = formData.get("endDate") as string;

    const event = await getOneEvent(eventId);

    const eventOrganizer = await getUser(event.organizer)

    try {
        if(user.username !== eventOrganizer.username) throw new Error("You are not allowed");

        if(!title || !description || !location || !startDate || !startTime || !endTime || !endDate || !price) throw new Error("All Fields Are Required");

        await connectToDatabase();

        const organizer = await User.findById(user._id);
        if (!organizer) throw new Error('Organizer not found');

        const updates = {
            title,
            description,
            details,
            location,
            image: imgURL,
            price,
            category,
            startDate,
            startTime,
            endDate,
            endTime
        }
        
        const updatedEvent = await Event.findByIdAndUpdate(event._id, updates);

        const data = new ActionResponse(200, updatedEvent);
        console.log(data);
    } catch (error) {
        handleError(error);
    }

    redirect("/");
};

const populateEvent = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category' });
};

export const getAllEvents = async ({ query, limit = 6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
        const categoryCondition = category ? categories.filter(val => val.name == category) : null;
        const conditions = {
            $and: [titleCondition, categoryCondition ? { category: categoryCondition[0].name } : {}],
        };

        const skipAmount = (Number(page) - 1) * limit;
        const eventsQuery = Event.find(conditions).sort({ createdAt: 'desc' }).skip(skipAmount).limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
};

export const addComment = async (eventId: string, formData:FormData) => {
    const user = await getCuttentUser();
    const event = await getOneEvent(eventId);
    const userComment = formData.get("comment") as string;

    try {
        const comment = {
            userId: user._id,
            userName: `${user.firstName} ${user?.lastName == undefined ? '' : user?.lastName}`,
            userAvatar: user.photo,
            userComment
        };

        await event.comments.push(comment);
        await event.save();

        revalidatePath(`/event/${eventId}`)
    } catch (error) {
        handleError(error);
    }
};

export const saveEvent = async (eventId: string, actionType: string) => {
    const user = await getCuttentUser();

    try {
        if(actionType === 'save') {
            await user.savedPosts.push(eventId);
            await user.save();
        }
        if(actionType === 'remove') {
            const index = await user.savedPosts.indexOf(eventId);
            if (index > -1) {
                await user.savedPosts.splice(index, 1);
                await user.save();
            }

        }
    } catch (error) {
        handleError(error);
    }
};

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
    const event = await getOneEvent(eventId);
    const eventOrganizer = await getUser(event.organizer)
    const user = await getCuttentUser();

    try {
        if(user.username !== eventOrganizer.username) throw new Error("You are not allowed");

        await connectToDatabase();

        const users = await User.find();
        if(users) {
            users.map(async (user) => {
                const isSaved = await user.savedPosts.includes(eventId);
                if(isSaved) {
                    const index = await user.savedPosts.indexOf(eventId);
                    if (index > -1) {
                        await user.savedPosts.splice(index, 1);
                        await user.save();
                    }
                }
            })
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if(deletedEvent) revalidatePath(path);
    } catch (error) {
        handleError(error);
    }
};

export const getRelatedEvents = async (category: string, currentId: string) => {
    let allRelatedEvents = [];

    const event = await getOneEvent(currentId);
    
    try {
        const relatedEvents = await Event.find({ category });
        allRelatedEvents = JSON.parse(JSON.stringify(relatedEvents));
        const filtered = allRelatedEvents.filter((e: any) => e._id !== JSON.parse(JSON.stringify(event._id)));
        return filtered;
    } catch (error) {
        handleError(error);
    }
};

export const getEventsByUser = async ({ userId, limit = 6, page }: GetEventsByUserParams) => {
    try {
        await connectToDatabase();

        const conditions = { organizer: userId };
        const skipAmount = (page - 1) * limit;

        const eventsQuery = Event.find(conditions).sort({ createdAt: 'desc' }).skip(skipAmount).limit(limit);

        const events = await populateEvent(eventsQuery);

        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit)
        }
    } catch (error) {
        handleError(error);
    }
};