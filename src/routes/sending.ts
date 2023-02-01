import express from 'express'
import { todoController } from '../controllers/sending'
import { keycloak } from '../config/keycloak'

const router = express.Router()

router.get('/', keycloak.protect(), todoController)

export { router as todoRouter }