import mongoose from 'mongoose';
const { Schema } = mongoose;

export const StatusSchema = new Schema({
    date: {type:Date, default: Date.now},
    status: { type: String, enum: ['CREATED', 'PRODUCED', 'DELIVERED', 'ADDRESS_INVALID'], default: 'CREATED'}
})

export enum statuses {
    CREATED = 'CREATED',
    PRODUCED = 'PRODUCED',
    DELIVERED = 'DELIVERED',
    ADDRESS_INVALID = 'ADDRESS_INVALID'
}