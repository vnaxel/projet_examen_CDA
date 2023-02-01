import mongoose, { Schema } from 'mongoose';

export interface DeliveryStatuses {
    lastStatus: { status: string, date: Date };
    statuses: [{ status: string, date: Date }] | Array<{ status: string, date: Date } | null>;
}

export const DeliveryStatusesSchema = new Schema({
    lastStatus: { status: String, date: Date },
    statuses: [{ status: String, date: Date }]
})

export default mongoose.model<DeliveryStatuses>('DeliveryStatuses', DeliveryStatusesSchema);
