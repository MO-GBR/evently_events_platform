"use server";

import fs from 'fs';
import { redirect } from "next/navigation";
import { connectToDatabase } from "../Database";
import User from "../Database/Models/UserModel";
import { ActionResponse, handleError } from "../Utils/responseHandle";

import { hash } from "bcryptjs";
import { signIn } from '../auth';
import { CredentialsSignin } from 'next-auth';

import { auth } from "../auth";

import { v4 as uuidv4 } from 'uuid';

export const RegisterUser = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const photo = formData.get("photo") as File;

    const tail = uuidv4();
    
    try {
        const uploadDir = process.env.UPLOAD_DIR;
        const imgSrc = process.env.IMG_SRC;

        const userNameValue = `${username}${tail}`;

        const photoDir = `${uploadDir}${userNameValue}`;
        const Avatar = `${photoDir}/${photo.name}`;

        const userAvatar = (Avatar === `${photoDir}/undefined`) ? "/assets/images/placeholder.png" : `${imgSrc}${username}/${photo.name}`

        if(photo.name == "undefined") {
            console.log("There is no image")
        } else {
            if(!fs.existsSync(photoDir)) {
                fs.mkdirSync(photoDir)
            }

            const arrayBuffer = await photo.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            fs.writeFileSync(Avatar, buffer);
        };

        if(!firstName || !lastName || !username || !email || !password) throw new Error("All Fields Are Required");
        
        if(password !== confirmPassword) throw new Error("Your passwords doesn't match");

        await connectToDatabase();

        const existingUser = await User.findOne({email});

        if(existingUser) throw new Error("User already exist");

        const usernameValidation = await User.findOne({username});

        if(usernameValidation) throw new Error(`username: ${username} is not available`);

        const hashedPassord = await hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            username: userNameValue,
            password: hashedPassord,
            photo: userAvatar
        });

        const data = new ActionResponse(200, newUser);
        console.log(data);
    } catch (error) {
        handleError(error);
    } finally {
        redirect("/login");
    }
};

export const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password
        });
        console.log("signed in successfuly");
    } catch (error) {
        const credentialsError = error as CredentialsSignin;
        handleError(credentialsError);
    };

    redirect("/");
};

export const getCuttentUser = async () => {
    const session = await auth();
    const email = session?.user?.email;
    try {
        await connectToDatabase();
        const user = await User.findOne({email});
        return user;
    } catch (error) {
        handleError(error);
    }
};

export const getUser = async (id: string) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        handleError(error);
    }
};