import { Request, Response } from "express"
import Recipient, { RecipientDocument, Statuses } from "../models/recipient"
import Sending from "../models/sending"
import { User } from "../models/user"

export const postSending = async (req: Request, res: Response) => {
    try {

        const user = res.locals.user as User
        logUser(user)

        const sending = await new Sending({
            senderId: user.sub,
            senderName: user.name,
            senderCompany: user.company,
            senderAddress: user.userAddress,
            letter: req.body.sending.letter,
            date: req.body.sending.date,
        }).save()

        await Promise.all(
            req.body.sending.recipients.map(
                async (recipient: RecipientDocument) => {
                    const recipt = await new Recipient({
                        sendingId: sending._id,
                        senderName: user.name,
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
        
        logUser(res.locals.user as User)
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

const logUser = (user: User) => {
    console.log("-------------- Sending user --------------")
    console.log(
        `Id: ${user.sub}
        Email: ${user.email}
        Username: ${user.preferred_username}
        FullName: ${user.name}
        Address: ${user.userAddress}
        Company: ${user.company}`
    )
    console.log("------------------------------------------")
}