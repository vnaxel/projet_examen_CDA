import mongoose from 'mongoose';
import { DeliveryStatuses, DeliveryStatusesSchema } from './deliveryStatus';
const { Schema } = mongoose;

export interface RecipientDocument extends Document {
    sendingId: string;
    letter: string;
    date: Date;
    deliveryStatuses: DeliveryStatuses;
}

export const RecipientSchema = new Schema({
    sendingId: String,
    address: String,
    firstName: String,
    lastName: String,
    deliveryStatuses: DeliveryStatusesSchema
})

export default mongoose.model<RecipientDocument>('Recipient', RecipientSchema);