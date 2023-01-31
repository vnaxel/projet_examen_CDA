import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import { appSession } from './config/memoryStore';
import { keycloak } from './config/keycloak';

dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(appSession)
app.use(keycloak.middleware())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
});

app.get('/protected', keycloak.protect(), (req: Request, res: Response) => {
    res.send('works')
})

app.listen(process.env.PORT, () => {
    console.log(`listening: http://localhost:${process.env.PORT}`)
});