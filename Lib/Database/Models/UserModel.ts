import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: [true, 'please enter your right email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    photo: { type: String },
    authProviderId: { type: String },
    savedPosts: [String],
}, { timestamps: true });

const User = models?.User || model('User', UserSchema);

export default User;