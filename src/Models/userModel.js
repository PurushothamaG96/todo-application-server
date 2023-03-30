const mongoose = require("mongoose");
const {model, Schema} = mongoose;
//Schema define
const userSchema = new Schema({
    email:{type:String, unique:true},
    password:{type:String}
})
//model connection
const userModel = model("users", userSchema);
module.exports = userModel;