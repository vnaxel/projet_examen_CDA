import { Request, Response } from "express"
import { keycloak } from "../config/keycloak"
import Recipient, { RecipientDocument, Statuses } from "../models/recipient"
import Sending from "../models/sending"
import { User } from "../models/user"

export const postSending = async (req: Request, res: Response) => {

    const grant = await keycloak.getGrant(req, res)
    const userInfos: User = await keycloak.grantManager.userInfo(grant.access_token!!)
    
    const sending = await new Sending({
        senderId: userInfos.sub,
        senderName: userInfos.name,
        senderCompany: userInfos.company,
        senderAddress: userInfos.userAddress,
        letter: req.body.sending.letter,
        date: req.body.sending.date
    }).save()

    await Promise.all(
        req.body.sending.recipients.map(async (recipient: RecipientDocument) => {
            const recipt = await new Recipient({
                sendingId: sending._id,
                senderName: userInfos.name,
                address: recipient.address,
                firstName: recipient.firstName,
                lastName: recipient.lastName,
                deliveryStatuses: {
                    lastStatus: { status: Statuses.CREATED, date: Date.now() }, statusesHistory: [] },
            }).save();
            sending.recipients.push(recipt)
        })
    )

    await sending.save().then(() => res.status(201).json({ sending }))

}

export const updateRecipientDeliveryStatusesByRecipientId = async (req: Request, res: Response) => {
            
        const recipient = await Recipient.findById(req.params.id)
        if (recipient) {
            recipient.deliveryStatuses.statusesHistory.unshift(recipient.deliveryStatuses.lastStatus)
            recipient.deliveryStatuses.lastStatus.status = req.body.status
            recipient.deliveryStatuses.lastStatus.date = new Date(Date.now())
            await recipient.save().then(() => res.status(200).json({ recipient }))
        } else {
            res.status(404).json({ message: "Recipient not found" })
        }
    
}

export const getAllSendings = async (req: Request, res: Response) => {

    const sendings = await Sending.find({}).populate('recipients')
    res.status(200).json({ sendings })

}