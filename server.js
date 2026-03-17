const express = require("express");
const mongoose = require("mongoose");
// const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/Todo").then(() => console.log("Mongo is connected")).catch(err => console.log(err));
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.post("/register", async (req, res) => {
    try {
        console.log("req.body")
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });


        await newUser.save();


        res.status(201).json({ message: "User Registered Successfully" });


    } catch (error) {
        res.status(400).json({ message: "Error registering user", error });
    }
});
