import mongoose from 'mongoose';
import { StatusSchema } from './status';
const { Schema } = mongoose;

export const DeliveryStatusesSchema = new Schema({
    recipientId: String,
    lastStatus: StatusSchema,
    statuses: [StatusSchema]
})