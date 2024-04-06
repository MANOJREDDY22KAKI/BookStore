// const express = require("express");

// const Book = require("./models/bookModels")

// 

import  express  from "express";

import Book from "../models/bookModels.js";

const router = express.Router();

router.delete('/:id',async(request,response)=>{
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return response.status(500).send({message:"Book not found"})
        }
        return response.status(200).send({message:"Book deleted successfully."})
    } catch (error) {
        console.log(error);
        response.status(505).send({message:error.message})
    }
})

//inserting the data in to the database.

router.post('/',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.Author ||
            !request.body.PublishYear
        ){
            return response.status(400).send({message:"enter All details Author,Title,PublishYear"})
        }
        
        const newBook = {
            title:request.body.title,
            Author:request.body.Author,
            PublishYear:request.body.PublishYear
        };

        const book = await Book.create(newBook);

        response.status(202).send(book);

    }catch(error){
        console.log(error);
        response.status(505).send({message:error.message})
    }
})

//reading the books in the database

router.get('/',async(request,response)=>{
    try {
        const books = await Book.find({})

        return response.status(200).send({
            count : books.length,
            data : books
        })
    } catch (error) {
        console.log(error);
        response.status(505).send({message:error.message})
    }
})

//Update the data based on id of the book
router.put('/:id',async(request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.Author ||
            !request.body.PublishYear
        ){
            return response.status(400).send({message:"enter All details Author,Title,PublishYear"})
        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(400).send({message:"Book not Found"})
        }
        
        return response.status(200).send({message:"Book updated successfully"})
    } catch (error) {
        console.log(error);
        response.status(505).send({message:error.message})
    }
})

//reading a book based on the id
router.get('/:id',async(request,response)=>{
    try {

        const {id} = request.params;
        const book = await Book.findById(id)

        return response.status(200).send(book)
    } catch (error) {
        console.log(error);
        response.status(505).send({message:error.message})
    }
})

// module.exports = router;
export default router;