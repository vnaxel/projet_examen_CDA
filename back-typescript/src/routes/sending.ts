import express from 'express'
import { getAllUserSendingsByUserId, postSending, updateRecipientDeliveryStatusesByRecipientId } from '../controllers/sending'
import { keycloak } from '../config/keycloak'

const router = express.Router()

router.post('/', keycloak.protect(), postSending)

router.patch('/:id', keycloak.protect(), updateRecipientDeliveryStatusesByRecipientId)

router.get('/:id', keycloak.protect(), getAllUserSendingsByUserId)

export { router as sendingRouter}