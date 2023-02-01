import mongoose, { Schema, Document } from 'mongoose';
import { RecipientDocument, RecipientSchema } from './recipient';

export interface SendingDocument extends Document {
    _id: any;
    senderId: string;
    letter: string;
    date: Date;
    recipients: RecipientDocument[];
}

export const SendingSchema: Schema = new mongoose.Schema({
    senderId: { type: String, required: true },
    letter: { type: String, required: true },
    date: { type: Date, default: Date.now },
    recipients: [{ type: Schema.Types.ObjectId, ref: 'Recipient' }]
});

export default mongoose.model<SendingDocument>('Sending', SendingSchema);