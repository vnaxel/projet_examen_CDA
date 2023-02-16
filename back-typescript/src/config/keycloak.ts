import Keycloak from "keycloak-connect"
import { memoryStore } from "./memoryStore"
import dotenv from "dotenv"
dotenv.config()

const config = {
    "realm": "Examen-CDA",
    "auth-server-url": `http://${process.env.KEYCLOAK}/`,
    "ssl-required": "none",
    "resource": "backend_sending_app",
    "enable-cors": true,
    "credentials": {
      "secret": "e6SCrlB9Pah1u4EqlbJvKPveCDnb1Q37"
    },
    "confidential-port": 0
}

export const keycloak = new Keycloak(
    { store: memoryStore },
    config
)
