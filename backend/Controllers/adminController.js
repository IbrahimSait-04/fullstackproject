const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../Models/userSchema")
const { findById } = require("../Models/rentalModel")



const banUser = async (req,res)=>{
    try {
        const {id}= req.params

       const user =await  User.findById(id)
        if(!user){
            return res.status(404).send("User Not Found")
        }

        user.ban = !user.ban;

        await user.save();

        res.status(200).json({
            success:true,
            message: user.ban
            ? "User Banned Succesfully"
            : "User UnBanned Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")   
    }
}

module.exports = banUser