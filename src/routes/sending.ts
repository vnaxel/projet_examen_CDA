import express from 'express'
import { postSending, todoController } from '../controllers/sending'
import { keycloak } from '../config/keycloak'

const router = express.Router()

router.post('/', keycloak.protect(), postSending)

export { router as todoRouter }