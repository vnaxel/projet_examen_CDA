import express from 'express'
import { postSending, updateRecipientDeliveryStatusesByRecipientId } from '../controllers/sending'
import { keycloak } from '../config/keycloak'

const router = express.Router()

router.post('/', keycloak.protect(), postSending)

router.patch('/:id', keycloak.protect(), updateRecipientDeliveryStatusesByRecipientId)

export { router as sendingRouter}