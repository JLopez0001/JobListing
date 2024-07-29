import mongoose, { mongo } from 'mongoose';
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("returnOriginal", false);

let connectionString = process.env.DB_URL || "mongodb://127.0.0.1:27017/jobListinsDatabase";

mongoose.connect(connectionString).catch((err) => {
    console.log(`Error connecting to MongoDB: ${err.message}`);
});

mongoose.connection.on("Connected", () => console.log("Connected to database"));

mongoose.connection.on("Disconnected", () => {
    console.log(chalk.bold("Disconnected from MongoDB"));
});

mongoose.connection.on("error", (err) => {
    console.log(chalk.bold(`MongoDB connection erro: ${err}`))
})

export default mongoose.connection