import db from "./db/connection.js"
import express from 'express';
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// app.use("/", routes)

db.on("connected", () => {
    console.clear();
    console.log(chalk.green("CONNECTED TO MONGODB"));

    app.listen(PORT, () => {
        console.log(chalk.bgMagenta(`Express server running on port: ${PORT}`))
    });
});