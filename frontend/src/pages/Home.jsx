import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import titleimg from "../assets/title_img.png";
import Footer from "../components/Footer";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function Home() {
  const token = localStorage.getItem("token");
  const [cars, setCars] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBookingAlert, setShowBookingAlert] = useState(false);
  const [showCars, setShowCars] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCars = async (req, res) => {
      try {
        const res = await axios.get(`${API_URL}/api/car/getCars`);
        setCars(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);

  const searchCars = async () => {
    try {
      if (!token) {
        return alert("Log in To Continue");
      }
      if (!pickupDate || !returnDate) {
        alert("Select Both Dates");
        return;
      }
      const res = await axios.post(
        `${API_URL}/api/rentals/availablecars`,
        { pickupDate, returnDate },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      setCars(res.data);
      setShowCars(true);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookCar = async (car) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please Login To Continue");
        return;
      }

      if (!user.license) {
        alert("Please Add Your Driving License Before Booking");
        nav("/license");
        return;
      }

      if (user.licenseStatus === "Pending") {
        alert("Your Driving License Is Waiting For Admins Approval");
        return;
      }

      if (user.licenseStatus === "Rejected") {
        alert("Your driving license was rejected. Please submit it again.");
        nav("/license");
        return;
      }

      if (user.licenseStatus !== "Approved") {
        alert("Not Yet Approved It Might Take 12-24Hrs");
        return;
      }

      const userId = user._id;
      console.log(localStorage.getItem("userId"));

      const totalDays =
        (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);

      const totalAmount = totalDays * car.carPrice;

      const order = await axios.post(
        `${API_URL}/api/payment/createOrder`,
        {
          amount: totalAmount,
        },
      );
      console.log(process.env.REACT_APP_RAZORPAY_KEY);
      console.log("Frontend Key:", process.env.REACT_APP_RAZORPAY_KEY);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,

        amount: order.data.amount,

        currency: order.data.currency,

        order_id: order.data.id,

        name: "Imperial Rentals",

        handler: async function (response) {
          // Verify payment
          const verify = await axios.post(
            `${API_URL}/api/payment/verify`,
            response,
          );
          if (verify.data.success) {
            await axios.post(
              `${API_URL}/api/rentals/bookcar`,
              {
                userId,
                carId: car._id,
                pickupDate,
                returnDate,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              },
            );
            searchCars();
            return alert("Car Booked Successfully");
          } else {
            alert("Verification Failed");
          }
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };
  const today = new Date().toISOString().split("T")[0];

  let minReturnDate = today;

  if (pickupDate) {
    const nextDay = new Date(pickupDate);
    nextDay.setDate(nextDay.getDate() + 1);

    minReturnDate = nextDay.toISOString().split("T")[0];
  }
  console.log(today);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[90vh]">
        {/* Background Image */}
        <img
          src={titleimg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="text-white max-w-2xl">
            <p className="text-lg tracking-widest uppercase mb-2">
              Premium Car Rental
            </p>

            <h1 className="text-6xl font-bold leading-tight">
              Find The Perfect Car
            </h1>

            <h2 className="text-5xl font-bold text-sky-400 mt-2">
              For Every Journey
            </h2>

            <p className="mt-6 text-lg text-gray-200">
              Rent premium vehicles at affordable prices. Experience comfort,
              luxury, and safety for your next trip.
            </p>

            <div className="flex gap-5 mt-8">
              <button className="bg-sky-500 hover:bg-sky-700 px-8 py-3 rounded-lg font-semibold duration-300">
                Rent Now
              </button>

              <button className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-24 w-[95%] max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pickup Date
              </label>

              <div className="relative">
                <input
                  type="date"
                  min={today}
                  value={pickupDate}
                  onChange={(p) => setPickupDate(p.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
                />
              </div>
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Return Date
              </label>

              <div className="relative">
                <input
                  type="date"
                  min={minReturnDate}
                  value={returnDate}
                  onChange={(r) => setReturnDate(r.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={searchCars}
              className="h-14 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-800 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
            >
              🔍 Search Cars
            </button>
          </div>
        </div>
      </section>

      {showCars && (
        <section className="max-w-7xl mx-auto py-20 px-6">
          {/* Space */}
          <div className="h-28"></div>

          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Available Cars
          </h2>

          {cars.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-red-600">
                No Cars Available
              </h2>

              <p className="text-gray-500 mt-3">
                Try selecting different dates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {cars.map((c) => {
                const totalDays =
                  (new Date(returnDate) - new Date(pickupDate)) /
                  (1000 * 60 * 60 * 24);

                const totalAmount = totalDays * c.carPrice;

                return (
                  <div
                    key={c._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                  >
                    <img
                      src={c.img}
                      alt={c.carName}
                      className="w-full h-60 object-cover"
                    />

                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {c.carName}
                      </h2>

                      <p className="text-gray-500 mt-3">{c.description}</p>

                      <div className="border-t mt-5 pt-5 space-y-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Rent / Day</span>

                          <span className="text-sky-600 font-bold">
                            ₹{c.carPrice}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="font-semibold">Pickup</span>

                          <span>{pickupDate}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="font-semibold">Return</span>

                          <span>{returnDate}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="font-semibold">Total Days</span>

                          <span>{totalDays}</span>
                        </div>

                        <div className="flex justify-between text-xl font-bold border-t pt-4">
                          <span>Total Amount</span>

                          <span className="text-green-600">₹{totalAmount}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCar(c);
                          setShowBookingAlert(true);
                        }}
                        className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Space */}
      <div className="h-28"></div>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center">
          Why Choose Imperial Rentals
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Premium cars with exceptional service.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="font-bold text-xl">Wide Selection</h3>
            <p className="text-gray-500 mt-3">
              Economy, SUV, Luxury & Sports Cars.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="font-bold text-xl">Affordable Prices</h3>
            <p className="text-gray-500 mt-3">
              Transparent pricing with no hidden charges.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="font-bold text-xl">Safe & Reliable</h3>
            <p className="text-gray-500 mt-3">
              Fully insured and well-maintained vehicles.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="font-bold text-xl">24/7 Support</h3>
            <p className="text-gray-500 mt-3">
              Our team is available anytime you need help.
            </p>
          </div>
        </div>
      </section>
      {showBookingAlert && selectedCar && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Car</span>
                <span>{selectedCar.carName}</span>
              </div>

              <div className="flex justify-between">
                <span>Pickup</span>
                <span>{pickupDate}</span>
              </div>

              <div className="flex justify-between">
                <span>Return</span>
                <span>{returnDate}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-bold text-green-600">
                  ₹
                  {((new Date(returnDate) - new Date(pickupDate)) /
                    (1000 * 60 * 60 * 24)) *
                    selectedCar.carPrice}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
              <h3 className="font-bold mb-2">Cancellation Policy</h3>

              <ul className="text-sm space-y-1 list-disc ml-5">
                <li>More than 3 days before pickup → 75% refund</li>
                <li>12 hours to 3 days before pickup → 50% refund</li>
                <li>Less than 12 hours before pickup → No refund</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowBookingAlert(false)}
                className="px-5 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowBookingAlert(false);
                  bookCar(selectedCar);
                }}
                className="px-5 py-2 rounded-lg bg-sky-600 text-white"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
