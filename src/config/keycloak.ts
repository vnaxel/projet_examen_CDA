import Keycloak from 'keycloak-connect'
import { memoryStore } from './memoryStore'
import fs from 'fs'

const config = JSON.parse(fs.readFileSync('./src/config/keycloak.json').toString())

export const keycloak: Keycloak.Keycloak = new Keycloak({ store: memoryStore }, config)
