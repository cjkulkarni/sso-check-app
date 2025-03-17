import express from "express";
const user = express.Router();

/** users */
user.get("/", (req, res) => {
     res.json({ message: "welcome to user" } );
});


export default user;