import express from "express"
import { setupApp } from "./setup-app"
import { runDB } from "./db/mongo.db"
import * as dotenv from 'dotenv'
dotenv.config()

const mongoUrl = process.env.MONGO_URL

if (!mongoUrl) {
  throw new Error('Cannot access database')
}

const bootstrap = async () => {
    const app = express()
    setupApp(app)

    const port = process.env.PORT

    await runDB(mongoUrl)

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })

} 

bootstrap()