import { Request, Response } from "express"
import { keycloak } from "../config/keycloak"
import Recipient from "../models/recipient"
import Sending from "../models/sending"
import { User } from "../models/User"

export const postSending = async (req: Request, res: Response) => {

    const grant = await keycloak.getGrant(req, res)
    const userInfos: User = await keycloak.grantManager.userInfo(grant.access_token!!)
    const senderId = userInfos.sub
    const sending = await new Sending({
        senderId,
        letter: req.body.sending.letter,
        date: req.body.sending.date
    }).save()

    await Promise.all(
        req.body.sending.recipients.map(async (recipient: any) => {
            const recipt = await new Recipient({
                sendingId: sending._id,
                address: recipient.address,
                firstName: recipient.firstName,
                lastName: recipient.lastName,
                deliveryStatuses: {
                    lastStatus: { status: "CREATED", date: Date.now() }, statuses: [] },
            }).save();
            sending.recipients.push(recipt)
        })
    )

    await sending.save().then(() => res.status(201).json({ sending }))

}

export const updateRecipientDeliveryStatusesByRecipientId = async (req: Request, res: Response) => {
    

}

export const getAllSendings = async (req: Request, res: Response) => {
    
    const sending = await Sending.find({}).populate('recipients')
    res.status(200).json({ sending })

}