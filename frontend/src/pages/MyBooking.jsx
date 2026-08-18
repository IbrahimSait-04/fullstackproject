import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyBooking() {
  const authToken = localStorage.getItem("token");
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          `http://localhost:5000/api/rentals/myrentals/${user._id}`,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          },
        );

        const sortedRentals = [...res.data].sort((a, b) => {
          const order = {
            Booked: 1,
            "Pending Return": 2,
            Returned: 3,
            Cancelled: 4,
          };

          return order[a.status] - order[b.status];
        });

        setRentals(sortedRentals);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, [authToken]);

  const cancelBooking = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/rentals/cancel-booking/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        },
      );

      alert(res.data.message);

      // Refresh bookings after cancellation
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `http://localhost:5000/api/rentals/myrentals/${user._id}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        },
      );

      const sortedRentals = [...response.data].sort((a, b) => {
        const order = {
          Booked: 1,
          "Pending Return": 2,
          Returned: 3,
          Cancelled: 4,
        };

        return order[a.status] - order[b.status];
      });

      setRentals(sortedRentals);
    } catch (error) {
      console.log(error);
      alert(error.response?.data || "Something went wrong");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "bg-blue-100 text-blue-700";
      case "Returned":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Bookings
        </h1>

        {rentals.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-20">
            No Bookings Found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentals.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={r.car ? r.car.img : "No Image"}
                  alt={r.car ? r.car.carName : "Car Deleted"}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {r.car ? r.car.carName : "Car Deleted"}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        r.status,
                      )}`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <p className="text-gray-500 mt-2">
                    {r.car ? r.car.description : "N/A"}
                  </p>

                  <div className="mt-5 border-t pt-5 space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        Registration
                      </span>
                      <span>{r.car ? r.car.regNo : "N/A"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        Pickup Date
                      </span>
                      <span>{new Date(r.pickupDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        Return Date
                      </span>
                      <span>{new Date(r.returnDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        Rent / Day
                      </span>
                      <span>₹{r.car ? `${r.car.carPrice}` : "N/A"}</span>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-5 flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price</span>

                    <span className="text-2xl font-bold text-green-600">
                      ₹{r.totalPrice}
                    </span>
                  </div>
                  {r.status === "Booked" && (
                    <button
                      onClick={() => cancelBooking(r._id)}
                      className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Cancel Booking
                    </button>
                  )}
                  {r.status === "Cancelled" && (
                    <div className="mt-6 border-t pt-5 space-y-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Refund Amount
                        </span>

                        <span className="text-green-600 font-semibold">
                          ₹{r.refundAmount}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Cancellation Fee
                        </span>

                        <span className="text-red-600 font-semibold">
                          ₹{r.cancellationFee}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Refund Status
                        </span>

                        {r.refundAmount > 0 ? (
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              r.refundStatus === "Completed"
                                ? "bg-green-100 text-green-700"
                                : r.refundStatus === "Processing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : r.refundStatus === "Initiated"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {r.refundStatus}
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Not Eligible
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
