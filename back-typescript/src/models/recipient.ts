import mongoose, { Schema } from "mongoose"

export interface RecipientDocument extends mongoose.Document {
    _id: any
    sendingId: string
    senderName: string
    address: string
    firstName: string
    lastName: string
    deliveryStatuses: {
        lastStatus: { status: string; date: Date }
        statusesHistory: { status: string; date: Date }[]
    }
}

export const RecipientSchema = new Schema({
    sendingId: String,
    senderName: String,
    address: String,
    firstName: String,
    lastName: String,
    deliveryStatuses: {
        lastStatus: { status: String, date: Date },
        statusesHistory: [{ status: String, date: Date }],
    },
})

export const enum Statuses {
    CREATED = "CREATED",
    PRODUCED = "PRODUCED",
    DELIVERED = "DELIVERED",
    ADDRESS_INVALID = "ADDRESS_INVALID",
}

export default mongoose.model<RecipientDocument>("Recipient", RecipientSchema)
