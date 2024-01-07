import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/authRoute";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", router);
async function getDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(5000, () => {
      console.log("Server is listening!!!");
    });
  } catch {
    process.exit(1);
  }
}
getDb();
