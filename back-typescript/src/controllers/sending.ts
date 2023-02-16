import { Request, Response } from "express"
import { keycloak } from "../config/keycloak"
import Recipient, { RecipientDocument, Statuses } from "../models/recipient"
import Sending from "../models/sending"
import { User } from "../models/user"

export const postSending = async (req: Request, res: Response) => {
    try {
        const grant = await keycloak.getGrant(req, res)

        if (!grant) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const userInfos: User = await keycloak.grantManager.userInfo(
            grant.access_token!!
        )

        console.log(`Sending user : ${userInfos}`)

        const sending = await new Sending({
            senderId: userInfos.sub,
            senderName: userInfos.name,
            senderCompany: userInfos.company,
            senderAddress: userInfos.userAddress,
            letter: req.body.sending.letter,
            date: req.body.sending.date,
        }).save()

        await Promise.all(
            req.body.sending.recipients.map(
                async (recipient: RecipientDocument) => {
                    const recipt = await new Recipient({
                        sendingId: sending._id,
                        senderName: userInfos.name,
                        address: recipient.address,
                        firstName: recipient.firstName,
                        lastName: recipient.lastName,
                        deliveryStatuses: {
                            lastStatus: {
                                status: Statuses.CREATED,
                                date: Date.now(),
                            },
                            statusesHistory: [],
                        },
                    }).save()
                    sending.recipients.push(recipt)
                }
            )
        )
        await sending.save().then(() => res.status(201).json({ sending }))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getAllUserSendingsByUserId = async (
    req: Request,
    res: Response
) => {
    try {
        const sendings = await Sending.find({
            senderId: req.params.id,
        }).populate("recipients")
        if (sendings) {
            res.status(200).json({ sendings })
        } else {
            res.status(404).json({ message: "No sending found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}
