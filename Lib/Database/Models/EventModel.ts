import { Document, Schema, model, models } from "mongoose";

export interface IComment {
    userId?: string;
    userAvatar: string;
    userName: string;
    userComment: string;
};

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    image: string;
    startTime: string;
    startDate: string;
    endTime: string;
    endDate: string;
    price: string;
    details?: string;
    category: string;
    organizer: string;
    comments: IComment[];
};

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    image: { type: String, required: true },
    price: { type: String },
    startTime: { type: String },
    startDate: { type: String },
    endTime: { type: String },
    endDate: { type: String },
    comments: [
        {
            userId: {
                type: String
            },
            userName: {
                type: String
            },
            userAvatar: {
                type: String
            },
            userComment: {
                type: String
            },
        }
    ],
    category: { type: String },
    details: { type: String },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
  
const Event = models.Event || model('Event', EventSchema);
  
export default Event;