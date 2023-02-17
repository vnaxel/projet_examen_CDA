import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const { MONGO_HOSTNAME, MONGO_PORT_1, MONGO_PORT_2, MONGO_PORT_3 } = process.env

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT_1},${MONGO_HOSTNAME}:${MONGO_PORT_2},${MONGO_HOSTNAME}:${MONGO_PORT_3}/?replicaSet=rs0&readPreference=primary&ssl=false`

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    serverSelectionTimeoutMS: 60000,
    connectTimeoutMS: 60000,
    dbName: "sendings",
    autoIndex: true,
    autoCreate: true,
}

const db = mongoose.set("strictQuery", false).connect(url, options)

export default db
