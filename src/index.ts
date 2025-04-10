import express from "express"
import cors from "cors"
import { errorMiddleware } from "./middleware/error.middleware"
import sampleRouter from "./routes/sample.router"

const app = express()
app.use(cors())
app.use(errorMiddleware)

app.use("/samples", sampleRouter)

app.listen(8000, () => {
    console.log(`server running on PORT: ${8000}`)
})