//LIBRAIRIE
const express = require('express');
const dotenv = require("dotenv");
const app = express();
dotenv.config({
    path: "./config.env",
});
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

// Import routers
const userRouter = require("./router/userRouter");
const contactRouter = require("./router/contactRouter");
app.use('/user', userRouter);
app.use('/contact', contactRouter);



//connexion à mongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to MongoDB !");
    });






app.listen(process.env.PORT, () => {
    console.log("Listening on port 3000");
});
