const mongoose = require("mongoose");
const {model, Schema} = mongoose;
const  objectId= require("mongoose").ObjectId
//Schema define
const todoSchema = new Schema({
    item:{type:String, required:true},
    priority_level:{type:String, required:true},
    due_date:{type:String, required:true},
    starred:{type:String, required:true},
    userId:{type:objectId, ref:"users"}
}, {timestamps:true})

//model connection
const todoModel = model("todo", todoSchema);
module.exports = todoModel;