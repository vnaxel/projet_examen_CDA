import mongoose from 'mongoose';
const { Schema } = mongoose;

export const StatusSchema = new Schema({
    date: {type:Date, default: Date.now},
    status: { type: String, enum: ['CREATED', 'PRODUCED', 'DELIVERD', 'ADDRESS_INVALID'], default: 'CREATED'}
})

export enum statuses {
    CREATED = 'CREATED',
    PRODUCED = 'PRODUCED',
    DELIVERD = 'DELIVERD',
    ADDRESS_INVALID = 'ADDRESS_INVALID'
}