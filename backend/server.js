const dotenv = require("dotenv")
dotenv.config();

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const ConnectDB = require("./config/db")
const authRoutes= require("./Routes/authRoutes")
const carRoutes = require("./Routes/carRoutes")
const rentalRoutes = require("./Routes/rentalRoutes")
const paymentRoutes = require("./Routes/paymentRoute")




const app = express()
const port = 5000


ConnectDB();

app.use(cors())
app.use(express.json())
app.use("/api",authRoutes)
app.use("/api/car",carRoutes)
app.use("/api/rentals", rentalRoutes)
app.use("/api/payment",paymentRoutes)




app.listen(port, ()=>{
    console.log(`server running at port, ${port}`);
    
})