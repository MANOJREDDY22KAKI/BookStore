
import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    Author: {
        type : String,
        required:true,
    },
    PublishYear:{
        type:Number,
        required: true,
    }
})

const Book = mongoose.model('Book',bookSchema);

export default Book;