import express from 'express'
import { getAllSendings, postSending, updateRecipientDeliveryStatusesByRecipientId } from '../controllers/sending'
import { keycloak } from '../config/keycloak'

const router = express.Router()

router.post('/', keycloak.protect(), postSending)

router.patch('/:id', keycloak.protect(), updateRecipientDeliveryStatusesByRecipientId)

// router.get('/', keycloak.protect(), getAllSendings) // NOT A VALID ROUTE (ONLY FOR DEV PURPOSES)

export { router as sendingRouter}