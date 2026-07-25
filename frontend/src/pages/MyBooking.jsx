import axios from "axios";
import React, {  useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyBooking() {
  const authToken = localStorage.getItem("token")
  const [car, setCar] = useState([]);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    localStorage.getItem("user");
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(
        `http://localhost:5000/api/rentals/myrentals/${user._id}`,
        {
          headers:{
            
              authorization: `Bearer ${authToken}`
            
          }
        }
      );
      setRentals(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
                  src={r.car ? r.car.img : "No Image"
                  }
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

                  <p className="text-gray-500 mt-2">{r.car ? r.car.description : "N/A"}</p>

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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
