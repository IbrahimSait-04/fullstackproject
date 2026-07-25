const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    ban:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model("User", userSchema)

module.exports=User