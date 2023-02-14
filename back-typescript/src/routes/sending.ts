import express from "express"
import {
    getAllUserSendingsByUserId,
    postSending,
} from "../controllers/sending"
import { keycloak } from "../config/keycloak"

const router = express.Router()

router.post("/", keycloak.protect(), postSending)

router.get("/:id", keycloak.protect(), getAllUserSendingsByUserId)

export { router as sendingRouter }
