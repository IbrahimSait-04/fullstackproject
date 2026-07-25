import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNav from "../adminComponents/AdminNav";

export default function AllBookings() {
  const adminToken = localStorage.getItem("adminToken");
  const [rent, setRent] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/rentals/allbookings",
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        },
      );
      setRent(res.data);
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
      <AdminNav />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          All Bookings
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Manage all customer bookings
        </p>

        {rent.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-bold text-red-500">
                No Bookings Found
              </h2>

              <p className="text-gray-500 mt-3">
                There are currently no bookings.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-12">
            {rent.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300"
              >
                {/* Car Image */}
                <img
                  src={r.car ? r.car.img : "No Image"}
                  alt={r.car ? r.car.carName : "Car Deleted"}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">
                  {/* Header */}
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

                  {/* Customer */}
                  <div className="mt-6 border-t pt-5">
                    <h3 className="font-bold text-lg mb-3 text-gray-700">
                      Customer Details
                    </h3>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Name</span>
                        <span>{r.user?.name}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-semibold">Email</span>
                        <span className="text-sm">{r.user?.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking */}
                  <div className="mt-6 border-t pt-5">
                    <h3 className="font-bold text-lg mb-3 text-gray-700">
                      Booking Details
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Registration</span>

                        <span>{r.car ? r.car.regNo : "N/A"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-semibold">Pickup</span>

                        <span>
                          {new Date(r.pickupDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-semibold">Return</span>

                        <span>
                          {new Date(r.returnDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-semibold">Rent / Day</span>

                        <span className="text-sky-600 font-bold">
                          ₹{r.car ? `${r.car.carPrice}` : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-6 border-t pt-5 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>

                    <span className="text-3xl font-bold text-green-600">
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
