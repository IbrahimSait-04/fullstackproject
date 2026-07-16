const dotenv = require("dotenv")
dotenv.config();

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const ConnectDB = require("./config/db")
const authRoutes= require("./Routes/authRoutes")
const carRoutes = require("./Routes/carRoutes")




const app = express()
const port = 5000


ConnectDB();

app.use(cors())
app.use(express.json())
app.use("/api",authRoutes)
app.use("/api/car",carRoutes)





app.listen(port, ()=>{
    console.log(`server running at port, ${port}`);
    
})