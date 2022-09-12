const { timeStamp } = require("console");
const { default: mongoose } = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}

},{timestamps:true})

userSchema.plugin(uniqueValidator);
const User=mongoose.model("User",userSchema)
module.exports=User;