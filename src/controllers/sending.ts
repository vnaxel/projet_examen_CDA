import { Request, Response } from "express"
import { keycloak } from "../config/keycloak"
import Sending from "../models/sending"
import { User } from "../models/User"

export const postSending = async (req: Request, res: Response) => {

    const grant = await keycloak.getGrant(req, res)
    const userInfos: User = await keycloak.grantManager.userInfo(grant.access_token!!)

    const senderId = userInfos.sub
    const sending = new Sending({
        ...req.body.sending, senderId
    })
    sending.recipients.forEach(recipient => recipient.set({ sendingId: recipient.parent()._id ,deliveryStatuses: {lastStatus:  { status: 'CREATED'}}}))
    sending.save()
        .then(() => res.status(201).json(sending))
        .catch(error => res.status(400).json(error))
}