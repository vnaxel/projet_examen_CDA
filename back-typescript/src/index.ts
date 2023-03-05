import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { sendingRouter } from "./routes/sending"
import { consumeDeliveries } from "./services/deliveriesServices"
import getKeycloakRealmPK from "./config/getRealmPK"
import cors from "cors"
import db from "./config/db"

dotenv.config()

getKeycloakRealmPK()
const app: Express = express()

db.then(() => console.log("⚡ Connexion à MongoDB réussie ! ⚡"))
    .catch(err => {
        console.log("💧 Connexion à MongoDB échouée ! 💧")
        console.log(err)
})

app.use(express.json())
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || ["http://localhost:3000", "http://localhost:3001"]
    }
))
consumeDeliveries()

app.use("/sending", sendingRouter)

app.listen(process.env.PORT, () => {
    console.log(`⚡ Le serveur est up: http://localhost:${process.env.PORT} ⚡`)
})
