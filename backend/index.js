import express from "express";
import { PORT } from "./config.js";
import { MongoUrl } from './config.js';
import mongoose from 'mongoose';
const app = express();

app.get('/', (request, response) => {
    
    return response.status(234).send('Welcome to the server');
});




mongoose
.connect(MongoUrl)
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`);
    });

    console.log('MongoDB Connected');
})
.catch((err) => {
    console.log(`Error connecting to MongoDB ${err}`)
})