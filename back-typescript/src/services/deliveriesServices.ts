import { consumer } from "../config/consumer"
import Recipient from "../models/recipient"
import { io } from "../index"

export const consumeDeliveries = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: "statuses_topic" })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const rcpt = await Recipient.findById(
                message.key?.toString().slice(1, -1)
            )
            if (rcpt && message.value) {
                rcpt.deliveryStatuses = JSON.parse(message.value.toString())
                await rcpt.save()
                io.emit("deliveryEvent", rcpt.sendingId)
            }
        },
    })
}
