import mongoose, { Schema } from "mongoose"
import { RecipientDocument } from "./recipient"

export interface SendingDocument extends mongoose.Document {
    _id: any
    senderId: string
    senderName: string
    senderAddress: string
    senderCompany: string
    letter: string
    date: Date
    recipients: RecipientDocument[]
}

export const SendingSchema: Schema = new mongoose.Schema({
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderAddress: { type: String, required: true },
    senderCompany: { type: String, required: true },
    letter: { type: String, required: true },
    date: { type: Date, default: Date.now },
    recipients: [{ type: Schema.Types.ObjectId, ref: "Recipient" }],
})

export default mongoose.model<SendingDocument>("Sending", SendingSchema)
