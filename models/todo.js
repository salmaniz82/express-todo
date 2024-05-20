import mongoose from "mongoose";


let todoSchema = new mongoose.Schema(
    {
    "title": String,
    "status": {
        "type": Boolean,
        "default": false
    },
    }, 
    {"timestamps": true}
);


export default mongoose.model('todos', todoSchema);