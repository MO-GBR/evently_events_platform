import { Schema, model, models, Document } from 'mongoose'

export interface IOreder extends Document {
    createdAt: Date;
    totalAmount: string;
    event: {
        _id: string;
        title: string;
    };
    buyer: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
    };
};

const OrderSchema = new Schema({
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    totalAmount: {
        type: String,
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const Order = models.Order || model('Order', OrderSchema)

export default Order