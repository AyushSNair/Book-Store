import express from 'express';
import { Book } from '../models/bookModels.js';
const router = express.Router();

//Route for Saving a new Book
router.post('/', async (request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({ message: "Please fill all fields" });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook)
        response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

// Route for Get All Books from database
router.get('/', async (request, response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

//Route for getting one book by id from database
router.get('/:id', async(request, response)=>{
    try {
        const { id } =request.params;
        const bookid = await Book.findById(id);
        return response.status(200).json(bookid);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error});
    }
})

//Route for Updating a Book by id
router.put('/:id', async(request,response)=>{
    const { id } = request.params;
    const bookupdate = await Book.findByIdAndUpdate(id, request.body);
    if(!bookupdate){
        return response.status(404).json({message: 'Book not found' });
    }
    return response.status(200).json(bookupdate);

})

//Delete a book by id
router.delete('/:id', async (request, response)=>{
    try {
        const { id } = request.params;
        const bookDelete = await Book.findByIdAndDelete(id);
        return response.status(200).send({message: `Book with ${id} was successfully deleted`})    
    } catch (error) {
        response.status(404).json({message: 'Book not found' });
    }
    
})

export default router;