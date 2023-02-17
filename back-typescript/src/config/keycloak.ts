import Keycloak from "keycloak-connect"
import { memoryStore } from "./memoryStore"
import dotenv from "dotenv"
dotenv.config()

const config = {
  
    "realm": "Examen-CDA",
    "auth-server-url": "http://localhost:8080/",
    "ssl-required": "external",
    "resource": "backend_sending_app",
    "credentials": {
      "secret": "mZgdQzxtyF1BPaSAXJabV94tJ7BBa9Ny"
    },
    "confidential-port": 0
  
}

export const keycloak = new Keycloak(
    { store: memoryStore },
    config
)
