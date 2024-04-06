//importing the required libraries

// const express = require("express");
// const { PORT,MongoDBURL } = require("../config");
// const mongoose = require('mongoose')
// const Book = require("./models/bookModels")
// const booksRoute = require("./routes/booksRoute")

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import Book from "./models/bookModels.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';


const app = express();
//middlewares.
app.use(express.json())

app.use(cors())

app.get('/',(request,response)=>{
    console.log(request)
    response.status(200).send("Hello World!")
})

app.use('/books',booksRoute);

//connection to the database
mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('connected to the database.')
        app.listen(PORT, () => {
            console.log(`The server is listening at ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })
