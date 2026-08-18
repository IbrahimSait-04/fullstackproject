const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({

    img:{
        type:String,
        required:true
    },
    
    carName:{
        type:String,
        required:true
    },
    carPrice:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    regNo:{
        type:String,
        required:true
    },
    rc:{
        type:Date,
        required:true
    },
    puc:{
        type:Date,
        required:true,
    }
})

const Car = mongoose.model("Car", carSchema)

module.exports = Car