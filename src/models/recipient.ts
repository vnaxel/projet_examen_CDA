import mongoose from 'mongoose';
import { DeliveryStatusesSchema } from './deliveryStatus';
const { Schema } = mongoose;

export const RecipientSchema = new Schema({
    sendingId: String,
    address: String,
    firstName: String,
    lastName: String,
    deliveryStatuses: DeliveryStatusesSchema
})
