const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked","Pending Return", "Returned", "Cancelled"],
      default: "Booked",
    },
    refundAmount:{
      type:Number,
      default:0
    },
    cancellationFee:{
      type:Number,
      default:0
    },
    refundStatus:{
      type:String,
      enum:["Pending", "Initiated", "Processing", "Completed"],
      default: null,
    },
    cancelledAt:{
      type:Date
    },
    cancellationReason:{
      type:String,
      default:""
    },
  },
  {
    timestamps: true,
  },
);

const Rental = mongoose.model("Rental", rentalSchema);
module.exports = Rental;
