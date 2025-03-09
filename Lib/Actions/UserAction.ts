"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "../Database";
import User from "../Database/Models/UserModel";
import { ActionResponse, handleError } from "../Utils/responseHandle";

import { hash } from "bcryptjs";
import { signIn } from '../auth';
import { CredentialsSignin } from 'next-auth';

import { auth } from "../auth";

import { v4 as uuidv4 } from 'uuid';

export const RegisterUser = async (imgURL: string, formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const tail = uuidv4();
    
    try {
        if(!firstName || !lastName || !username || !email || !password) throw new Error("All Fields Are Required");

        const userNameValue = `${username}${tail}`;
        
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
            photo: imgURL
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