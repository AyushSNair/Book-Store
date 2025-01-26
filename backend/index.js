import express from "express";
import { PORT } from "./config.js";
import { MongoUrl } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js'
const app = express();


app.use(express.json());

app.get('/', (request, response) => {
    
    return response.status(234).send('Welcome to the server');
});

//Route to fetch a single book from database
app.get('/books/:id', async (request, response)=>{
    try{
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    
    }
    catch(error){
        return response.status(500).send({message: error});
    }
        
});


//Route to add a book to database
app.post('/books', (request, response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publish-year',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = new Book(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//Route to get a Book from database
app.get('/books', async (request,response) => {
    const book =  await Book.find({});
    return response.status(200).json({
        count: book.length,
        book: book
    });
})


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