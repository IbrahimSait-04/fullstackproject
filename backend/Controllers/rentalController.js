const Rental = require("../Models/rentalModel");
const User = require("../Models/userSchema");
const Car = require("../Models/carSchema");

const updateRentalStatus = async (req, res) => {
  try {
    const today = new Date();

    await Rental.updateMany(
      {
        status: "Booked",
        returnDate: { $lt: today },
      },
      {
        $set: { status: "Returned" },
      },
    );
    console.log("Rental Status Updated");
  } catch (error) {
    console.log(error);
  }
};

const bookCar = async (req, res) => {
  try {
    const { userId, carId, pickupDate, returnDate } = req.body;
    const today = new Date().toISOString().split("T")[0];
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

const getAllBooking = async (req, res) => {
  try {
    const bookings = await Rental.find().populate("car").populate("user");
    if (!bookings.length) {
      return res.status(404).send("No Bookings");
    }
    return res.status(200).send(bookings);
  } catch (error) {
    console.log(error);
  }
};
const getMyBooking = async (req, res) => {
  try {
    await updateRentalStatus();
    const { userId } = req.params;

    const booking = await Rental.find({ user: userId }).populate("car");
    if (!booking.length) {
      return res.status(404).send("No Bookings");
    }
    return res.status(200).send(booking);
  } catch (error) {
    console.log(error);
  }
};
const availableCars = async (req, res) => {
  try {
    const { pickupDate, returnDate } = req.body;
    const bookedRentals = await Rental.find({
      status: "Booked",
      pickupDate: { $lte: returnDate },
      returnDate: { $gte: pickupDate },
    });

    const bookedCarIds = bookedRentals.map((rental) => rental.car);

    const available = await Car.find({
      _id: {
        $nin: bookedCarIds,
      },
    });
    if (!available.length) {
      return res.status(404).send("No Cars Available For Rent");
    }
    return res.status(200).send(available);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bookCar,
  getMyBooking,
  getAllBooking,
  availableCars,
};
