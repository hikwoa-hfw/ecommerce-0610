import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import sampleRouter from "./routes/sample.router";
import authRouter from "./routes/auth.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/samples", sampleRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log(`server running on PORT: ${8000}`);
});
