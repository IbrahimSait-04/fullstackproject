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
    const fetchCars = async () => {
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
        {
          pickupDate,
          returnDate,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      setCars(res.data);
      setShowCars(true);
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

      const totalDays =
        (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);

      const totalAmount = totalDays * car.carPrice;

      const order = await axios.post(`${API_URL}/api/payment/createOrder`, {
        amount: totalAmount,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.data.amount,
        currency: order.data.currency,
        order_id: order.data.id,
        name: "Imperial Rentals",

        handler: async function (response) {
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

            alert("Car Booked Successfully");
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

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[700px] w-full sm:min-h-[750px] md:h-[90vh] md:min-h-[700px]">
        {/* Background */}
        <img
          src={titleimg}
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 py-20 sm:px-8 md:px-6">
          <div className="max-w-2xl text-white">
            <p className="mb-2 text-sm uppercase tracking-[0.2em] sm:text-base md:text-lg md:tracking-widest">
              Premium Car Rental
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Find The Perfect Car
            </h1>

            <h2 className="mt-2 text-3xl font-bold text-sky-400 sm:text-4xl md:text-5xl">
              For Every Journey
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-gray-200 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
              Rent premium vehicles at affordable prices. Experience comfort,
              luxury, and safety for your next trip.
            </p>

            {/* Hero Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-5">
              <button
                className="
                  w-full
                  rounded-lg
                  bg-sky-500
                  px-8
                  py-3
                  font-semibold
                  duration-300
                  hover:bg-sky-700
                  sm:w-auto
                "
              >
                Rent Now
              </button>

              <button
                className="
                  w-full
                  rounded-lg
                  border
                  border-white
                  px-8
                  py-3
                  duration-300
                  hover:bg-white
                  hover:text-black
                  sm:w-auto
                "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* ================= SEARCH BOX ================= */}
        <div
          className="
            absolute
            left-1/2
            z-20
            w-[calc(100%-2rem)]
            max-w-5xl
            -translate-x-1/2
            rounded-3xl
            border
            border-gray-200
            bg-white/95
            p-5
            shadow-2xl
            backdrop-blur-md
            sm:w-[calc(100%-3rem)]
            sm:p-6
            md:p-8
          "
          style={{ bottom: "-40px" }}
        >
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 md:gap-6">
            {/* Pickup */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Pickup Date
              </label>

              <input
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  bg-gray-50
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-sky-500
                  focus:ring-4
                  focus:ring-sky-100
                  sm:text-base
                "
              />
            </div>

            {/* Return */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Return Date
              </label>

              <input
                type="date"
                min={minReturnDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  bg-gray-50
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-sky-500
                  focus:ring-4
                  focus:ring-sky-100
                  sm:text-base
                "
              />
            </div>

            {/* Search */}
            <button
              onClick={searchCars}
              className="
                h-14
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-sky-600
                to-sky-800
                text-base
                font-semibold
                text-white
                shadow-lg
                transition
                duration-300
                hover:shadow-xl
                md:text-lg
              "
            >
              🔍 Search Cars
            </button>
          </div>
        </div>
      </section>

      {/* ================= AVAILABLE CARS ================= */}
      {showCars && (
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-44 sm:px-6 sm:pt-48 md:pt-52">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 sm:mb-10 sm:text-4xl md:mb-12">
            Available Cars
          </h2>

          {cars.length === 0 ? (
            <div className="py-16 text-center sm:py-20">
              <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">
                No Cars Available
              </h2>

              <p className="mt-3 text-sm text-gray-500 sm:text-base">
                Try selecting different dates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {cars.map((c) => {
                const totalDays =
                  (new Date(returnDate) - new Date(pickupDate)) /
                  (1000 * 60 * 60 * 24);

                const totalAmount = totalDays * c.carPrice;

                return (
                  <div
                    key={c._id}
                    className="
                      overflow-hidden
                      rounded-2xl
                      bg-white
                      shadow-lg
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-2xl
                    "
                  >
                    {/* Image */}
                    <img
                      src={c.img}
                      alt={c.carName}
                      className="h-52 w-full object-cover sm:h-56 md:h-60"
                    />

                    <div className="p-4 sm:p-5 md:p-6">
                      <h2 className="break-words text-xl font-bold text-gray-800 sm:text-2xl">
                        {c.carName}
                      </h2>

                      <p className="mt-3 break-words text-sm leading-6 text-gray-500 sm:text-base">
                        {c.description}
                      </p>

                      {/* Details */}
                      <div className="mt-5 space-y-3 border-t pt-5 text-sm sm:text-base">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-semibold">Rent / Day</span>

                          <span className="font-bold text-sky-600">
                            ₹{c.carPrice}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="font-semibold">Pickup</span>

                          <span className="text-right">{pickupDate}</span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="font-semibold">Return</span>

                          <span className="text-right">{returnDate}</span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="font-semibold">Total Days</span>

                          <span>{totalDays}</span>
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between gap-4 border-t pt-4 text-lg font-bold sm:text-xl">
                          <span>Total Amount</span>

                          <span className="text-green-600">₹{totalAmount}</span>
                        </div>
                      </div>

                      {/* Book */}
                      <button
                        onClick={() => {
                          setSelectedCar(c);
                          setShowBookingAlert(true);
                        }}
                        className="
                          mt-6
                          w-full
                          rounded-xl
                          bg-sky-600
                          py-3
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-sky-700
                          sm:text-base
                        "
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

      {/* ================= WHY CHOOSE US ================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Why Choose Imperial Rentals
        </h2>

        <p className="mt-3 text-center text-sm text-gray-500 sm:mt-4 sm:text-base">
          Premium cars with exceptional service.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-16 md:grid-cols-4 md:gap-8">
          <div className="rounded-xl p-6 text-center shadow-lg sm:p-8">
            <div className="mb-4 text-4xl sm:text-5xl">🚗</div>

            <h3 className="text-lg font-bold sm:text-xl">Wide Selection</h3>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Economy, SUV, Luxury & Sports Cars.
            </p>
          </div>

          <div className="rounded-xl p-6 text-center shadow-lg sm:p-8">
            <div className="mb-4 text-4xl sm:text-5xl">💰</div>

            <h3 className="text-lg font-bold sm:text-xl">Affordable Prices</h3>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Transparent pricing with no hidden charges.
            </p>
          </div>

          <div className="rounded-xl p-6 text-center shadow-lg sm:p-8">
            <div className="mb-4 text-4xl sm:text-5xl">🛡️</div>

            <h3 className="text-lg font-bold sm:text-xl">Safe & Reliable</h3>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Fully insured and well-maintained vehicles.
            </p>
          </div>

          <div className="rounded-xl p-6 text-center shadow-lg sm:p-8">
            <div className="mb-4 text-4xl sm:text-5xl">📞</div>

            <h3 className="text-lg font-bold sm:text-xl">24/7 Support</h3>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Our team is available anytime you need help.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BOOKING CONFIRMATION ================= */}
      {showBookingAlert && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-7 md:p-8">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">
              Confirm Booking
            </h2>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center justify-between gap-4">
                <span>Car</span>

                <span className="text-right font-medium">
                  {selectedCar.carName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Pickup</span>

                <span>{pickupDate}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Return</span>

                <span>{returnDate}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Total Amount</span>

                <span className="font-bold text-green-600">
                  ₹
                  {((new Date(returnDate) - new Date(pickupDate)) /
                    (1000 * 60 * 60 * 24)) *
                    selectedCar.carPrice}
                </span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="mt-5 rounded-xl border border-yellow-300 bg-yellow-50 p-4 sm:mt-6">
              <h3 className="mb-2 font-bold">Cancellation Policy</h3>

              <ul className="ml-5 list-disc space-y-1 text-xs sm:text-sm">
                <li>More than 3 days before pickup → 75% refund</li>

                <li>12 hours to 3 days before pickup → 50% refund</li>

                <li>Less than 12 hours before pickup → No refund</li>
              </ul>
            </div>

            {/* Modal Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowBookingAlert(false)}
                className="w-full rounded-lg border px-5 py-3 sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowBookingAlert(false);
                  bookCar(selectedCar);
                }}
                className="w-full rounded-lg bg-sky-600 px-5 py-3 text-white sm:w-auto"
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
