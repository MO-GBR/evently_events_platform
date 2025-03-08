"use server";

import { GetAllEventsParams, DeleteEventParams } from "@/Types";
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from "../Database";
import Event from "../Database/Models/EventModel";
import User from "../Database/Models/UserModel";
import { ActionResponse, handleError } from "../Utils/responseHandle";
import { getCuttentUser, getUser } from "./UserAction";
import fs from 'fs';
import { categories } from "@/Constants";
import { redirect } from "next/navigation";

export const createEvent = async (formData: FormData) => {
    const user = await getCuttentUser();

    const username = user.username;

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const details = formData.get("details") as string;
    const location = formData.get("location") as string;

    const image = formData.get("image") as File;

    const price = formData.get("price") as string;
    const category = formData.get("category") as string;

    const startTime = formData.get("startTime") as string;
    const startDate = formData.get("startDate") as string;

    const endTime = formData.get("endTime") as string;
    const endDate = formData.get("endDate") as string;

    try {
        const uploadDir = process.env.UPLOAD_DIR;
        const imgSrc = process.env.IMG_SRC;

        const photoDir = `${uploadDir}${username}/events`;
        const createPhoto = `${photoDir}/${image.name}`;
        const savePhoto = `${imgSrc}${username}/events/${image.name}`;

        if(image.name == "undefined") {
            throw new Error("Image is required")
        } else {
            if(!fs.existsSync(photoDir)) {
                fs.mkdir(photoDir, { recursive: true }, (error) => {
                    handleError(error);
                });
            }
        
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
        
            fs.writeFile(createPhoto, buffer, (error) => {
                handleError(error);
            });
        };

        if(!title || !description || !image || !location || !startDate || !startTime || !endTime || !endDate || !price) throw new Error("All Fields Are Required");

        await connectToDatabase();

        const organizer = await User.findById(user._id);
        if (!organizer) throw new Error('Organizer not found');
        
        const newEvent = await Event.create({
            title,
            description,
            location,
            image: savePhoto,
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

export const updateEvent = async (eventId: string, formData: FormData) => {
    const user = await getCuttentUser();

    const username = user.username;

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const details = formData.get("details") as string;
    const location = formData.get("location") as string;

    const image = formData.get("image") as File;

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
        
        const uploadDir = process.env.UPLOAD_DIR;
        const imgSrc = process.env.IMG_SRC;

        const photoDir = `${uploadDir}${username}/events`;
        const createPhoto = `${photoDir}/${image.name}`;
        const savePhoto = `${imgSrc}${username}/events/${image.name}`;

        const imageArray = event?.image.split("/");
        const imageName = imageArray[imageArray.length - 1] as string;

        const deletedPhoto = `${photoDir}/${imageName}`;

        if(image.name == "undefined") {
            console.log("There is no image");
        } else {
            if(fs.existsSync(deletedPhoto)) {
                fs.unlink(deletedPhoto, (err) => {
                    if (err) {
                        handleError(err)
                    }
                    console.log('file deleted')
                });
            };

            if(!fs.existsSync(photoDir)) {
                fs.mkdir(photoDir, { recursive: true }, (error) => {
                    handleError(error);
                });
            }
        
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
        
            fs.writeFile(createPhoto, buffer, (error) => {
                handleError(error);
            });
        };

        const eventImg = image.name == "undefined" ? event.image : savePhoto;

        if(!title || !description || !image || !location || !startDate || !startTime || !endTime || !endDate || !price) throw new Error("All Fields Are Required");

        await connectToDatabase();

        const organizer = await User.findById(user._id);
        if (!organizer) throw new Error('Organizer not found');

        const updates = {
            title,
            description,
            details,
            location,
            image: eventImg,
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

    // redirect(`/event/${eventId}`)
};

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
    const event = await getOneEvent(eventId);
    const eventOrganizer = await getUser(event.organizer)
    const user = await getCuttentUser();

    try {
        if(user.username !== eventOrganizer.username) throw new Error("You are not allowed");

        const uploadDir = process.env.UPLOAD_DIR;
        const photoDir = `${uploadDir}${user.username}/events`;

        const imageArray = event?.image.split("/");
        const imageName = imageArray[imageArray.length - 1] as string;

        const deletedPhoto = `${photoDir}/${imageName}`;

        if(fs.existsSync(deletedPhoto)) {
            fs.unlink(deletedPhoto, (err) => {
                if (err) {
                    handleError(err)
                }
                console.log('file deleted')
            });
        };

        await connectToDatabase();
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if(deletedEvent) revalidatePath(path);
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