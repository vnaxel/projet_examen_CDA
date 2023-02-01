import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import { appSession } from './config/memoryStore';
import { keycloak } from './config/keycloak';
import { todoRouter } from './routes/sending';
import mongoose from 'mongoose'


dotenv.config()
const app: Express = express()

mongoose.connect(`${process.env.MONGO_URI}`, {
    dbName: 'sendings',
    autoIndex: true,
    autoCreate: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(express.json())
app.use(appSession)
app.use(keycloak.middleware())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
});

app.use('/todo', todoRouter)

app.listen(process.env.PORT, () => {
    console.log(`listening: http://localhost:${process.env.PORT}`)
});