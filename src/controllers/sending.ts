import { Request, Response } from "express"
import { keycloak } from "../config/keycloak"
import Recipient, { RecipientDocument } from "../models/recipient"
import Sending from "../models/sending"
import { User } from "../models/User"

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

    const grant = await keycloak.getGrant(req, res)
    const userInfos: User = await keycloak.grantManager.userInfo(grant.access_token!!)
    console.log(userInfos)
    
    const sending = await Sending.find({}).populate('recipients')
    res.status(200).json({ sending })

}