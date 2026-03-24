import express from "express"
import { setupApp } from "./setup-app"
import { runDB } from "./db/mongo.db"
import { dbURL } from "./utils/config"
import { PORT } from "./utils/config"

const bootstrap = async () => {
    const app = express()
    setupApp(app)

    const port = process.env.PORT || PORT
    const mongoUrl = process.env.MONGO_URL || dbURL

    await runDB(mongoUrl)

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })

} 

bootstrap()