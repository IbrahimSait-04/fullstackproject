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
        $set: { status: "Pending Return" },
      },
    );
    console.log("Rental Status Updated");
  } catch (error) {
    console.log(error);
  }
};

const bookCar = async (req, res) => {
  try {
    const { carId, pickupDate, returnDate } = req.body;
    const today = new Date().toISOString().split("T")[0];
    const car = await Car.findById(carId);

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // Check license
    if (!user.license) {
      return res.status(403).json({
        success: false,
        message: "Please Add Your Driving License Before Booking",
      });
    }

    // Check admin approval
    if (user.licenseStatus !== "Approved") {
      return res.status(403).json({
        success: false,
        message: "Your Driving License Has Not Been Approved",
        licenseStatus: user.licenseStatus,
      });
    }

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
      user: req.userId,
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

const confirmReturn = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findById(id);
    if (!rental) {
      return res.status(404).send("Rent Not Found");
    }
    rental.status = "Returned";

    await rental.save();

    return res.status(200).send({
      success: true,
      message: "Car Returned Successfully",
      rental,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findById(id);

    if (!rental) {
      return res.status(404).send("Rental Not Found");
    }

    if (rental.status !== "Booked") {
      return res.status(400).send("Only booked rentals can be cancelled.");
    }

    const now = new Date();
    const pickup = new Date(rental.pickupDate);

    const remainingDay = pickup.getTime() - now.getTime();

    const remainingHours = remainingDay / (1000 * 60 * 60);
    const remainingDays = remainingHours / 24;

    let refundAmount = 0;
    let cancellationFee = 0;
    let refundStatus = null;

    if (remainingDays > 3) {
      refundAmount = rental.totalPrice * 0.75;
      cancellationFee = rental.totalPrice * 0.25;
      refundStatus = "Pending";
    } else if (remainingHours >= 12) {
      refundAmount = rental.totalPrice * 0.5;
      cancellationFee = rental.totalPrice * 0.5;
      refundStatus = "Pending";
    } else {
      refundAmount = 0;
      cancellationFee = rental.totalPrice;
    }

    rental.status = "Cancelled";
    rental.refundAmount = refundAmount;
    rental.cancellationFee = cancellationFee;
    rental.refundStatus = refundStatus;
    rental.cancelledAt = new Date();

    await rental.save();

    return res.status(200).send({
      success: true,
      message: "Booking Cancelled Successfully",
      refundAmount,
      cancellationFee,
      refundStatus,
      rental,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateRefundStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { refundStatus } = req.body;

    const rental = await Rental.findById(id);

    if (!rental) {
      return res.status(404).send("No Rentals Found");
    }

    if (rental.status !== "Cancelled") {
      return res
        .status(400)
        .send("Only Cancelled Rentals can have refund Status");
    }
    rental.refundStatus = refundStatus;
    await rental.save();

    return res.status(200).send({
      success: true,
      message: "Refund Status Updated Successfully",
      rental,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  bookCar,
  getMyBooking,
  getAllBooking,
  availableCars,
  confirmReturn,
  cancelBooking,
  updateRefundStatus,
};
