const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");

const authRoutes = require("./Routes/authRoutes");
const carRoutes = require("./Routes/carRoutes");
const rentalRoutes = require("./Routes/rentalRoutes");
const paymentRoutes = require("./Routes/paymentRoute");

const app = express();

ConnectDB();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/car", carRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/payment", paymentRoutes);

// Run on localhost
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("Server running at port 5000");
  });
}

module.exports = app;