const Rental = require("../Models/rentalModel");
const User = require("../Models/userSchema");
const Car = require("../Models/carSchema");

const bookCar = async (req, res) => {
  try {
    const { userId, carId, pickupDate, returnDate } = req.body;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).send("car not found");
    }
    const existingRental = await Rental.findOne({
      car: carId,
      status: "Booked",
      pickupDate: { $lte: returnDate },
      returnDate: { $gte: pickupDate },
    });
    if (existingRental) {
      return res.status(400).send("Car Is Already Booked ");
    }
    const days =
      (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);

    if (days <= 0) {
      return res.status(400).send("invalid date");
    }

    const totalPrice = days * car.carPrice;

    const rental = new Rental({
      user: userId,
      car: carId,
      pickupDate,
      returnDate,
      totalPrice,
    });
    await rental.save();

    res.status(201).send({
      success: true,
      message: "Car Booked Succesfully",
      rental,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getmyBooking = async(req,res)=>{
    try {
        const {userId} = req.params
    } catch (error) {
        
    }
}

module.exports = {
    bookCar,
    getmyBooking
}