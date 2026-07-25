const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/adminModel");
const Car = require("../Models/carSchema");
const Rental = require("../Models/rentalModel");
const JWT_SECRET = "Knight*58410";

const createCar = async (req, res) => {
  try {
    const { carName, carPrice, description, regNo } = req.body;
    const img = req.file ? req.file.path : "";
    const carExits = await Car.findOne({ regNo });
    if (carExits) {
      return res.status(409).send("Car Already Exists");
    }
    const car = new Car({
      img,
      carName,
      carPrice,
      description,
      regNo,
    });
    await car.save();
    res.status(200).send("Car Created Succesfully");
  } catch (error) {
    console.log(error);
  }
};

const getCar = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).send(cars);
  } catch (error) {
    console.log(error);
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const { carName, carPrice, description, regNo } = req.body;
    const img = req.file ? req.file.path : undefined;

    const updatedCar = {
      carName,
      carPrice,
      description,
      regNo,
    };
    if (img) {
      updatedCar.img = img;
    }

    const car = await Car.findByIdAndUpdate(id, updatedCar, { new: true });
    if (!car) {
      return res.status(404).send("Car Not Found");
    }
    res.status(200).send("Car Updated Successfully");
  } catch (error) {
    console.log(error);
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const booked = await Rental.findOne({
      car: id,
      status: "Booked",
    });

    if (booked) {
      return res.status(400).json({
        success: false,
        message: "Cannot Delete An Ongoing Rental Car",
      });
    }

    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Car Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createCar,
  getCar,
  updateCar,
  deleteCar,
};
