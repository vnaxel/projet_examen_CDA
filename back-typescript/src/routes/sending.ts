import express from "express"
import {
    getAllUserSendingsByUserId,
    postSending,
} from "../controllers/sending"
import auth from "../middlewares/auth"

const router = express.Router()

router.post("/", auth, postSending)

router.get("/:id", auth, getAllUserSendingsByUserId)

export { router as sendingRouter }
