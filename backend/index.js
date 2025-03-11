import express from "express";
import { PORT } from "./config.js";
import eventRoutes from './routes/eventRoutes.js';

import { MongoUrl } from './config.js';
import mongoose from 'mongoose';
import {Book}  from './models/bookModels.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/events', eventRoutes);


app.use(cors()); 





//Option 2: Allow Custom Origins 
// app.use(
//     cors({
//         origin: ["http://localhost:3000"],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// )
app.get('/', (request, response) => {
    
    return response.status(234).send('Welcome to the server');
});

app.use('/books', bookRoutes);

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
