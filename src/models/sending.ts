import mongoose from 'mongoose';
import { RecipientSchema } from './recipient';
const { Schema } = mongoose;

const SendingSchema = new Schema({
    senderId: String,
    letter: String,
    date: {type:Date, default: Date.now},
    recipients: [RecipientSchema]
})

export default mongoose.model('Sending', SendingSchema)