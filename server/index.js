import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import user from "./user/userController.js";

dotenv.config();

const app = express();


connectDB();
app.use("/users", user);
app.listen(5000, () => console.log("Server running on port 5000"));
