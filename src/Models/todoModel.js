const mongoose = require("mongoose");
const {model, Schema} = mongoose;
const  objectId= require("mongoose").ObjectId
//Schema define
const todoSchema = new Schema({
    item:{type:String, required:true},
    priority_level:{type:String, required:true},
    due_date:{type:Date, required:true},
    starred:{type:String, required:true},
    isCompleted:{type:Boolean, default:false},
    userId:{type:objectId, ref:"users"}
}, {timestamps:true})

//model connection
const todoModel = model("todo", todoSchema);
module.exports = todoModel;