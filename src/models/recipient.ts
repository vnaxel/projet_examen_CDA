import mongoose, { Schema } from 'mongoose';


export interface RecipientDocument extends mongoose.Document {
    _id: any;
    sendingId: string;
    address: string;
    firstName: string;
    lastName: string;
    deliveryStatuses: { lastStatus: { status: string, date: Date }, statuses: { status: string, date: Date }[] | []};
}

export const RecipientSchema = new Schema({
    sendingId: String,
    address: String,
    firstName: String,
    lastName: String,
    deliveryStatuses: { lastStatus: { status: String, date: Date }, statuses: [{ status: String, date: Date }] }
})

export default mongoose.model<RecipientDocument>('Recipient', RecipientSchema);