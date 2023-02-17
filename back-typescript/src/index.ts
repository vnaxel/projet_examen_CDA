import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { appSession } from "./config/memoryStore"
import { keycloak } from "./config/keycloak"
import { sendingRouter } from "./routes/sending"
import { consumeDeliveries } from "./services/deliveriesServices"
import cors from "cors"
import db from "./config/db"

dotenv.config()
const app: Express = express()

db.then(() => console.log("⚡ Connexion à MongoDB réussie ! ⚡"))
    .catch(err => {
        console.log("💧 Connexion à MongoDB échouée ! 💧")
        console.log(err)
})

app.use(express.json())
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:8080"],
    })
)
app.use(appSession)
app.use(keycloak.middleware())
consumeDeliveries()

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server root path")
})

app.use("/sending", sendingRouter)

app.listen(process.env.PORT, () => {
    console.log(`⚡ Le serveur est up: http://localhost:${process.env.PORT} ⚡`)
})
