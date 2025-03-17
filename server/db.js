import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
    try {
        
        mongoose.connection.on("connected", () => {
            console.log("connnected to database sucessfully ");
        });
        mongoose.connection.on("error", (err) => {
            console.log(`error in connection ${err}`);
            process.exit(1);
        });

        await mongoose.connect(config.databaseURL);

    } catch (err) {
        console.log(`error in connection ${err}`);
    }
  
}

export default connectDB;