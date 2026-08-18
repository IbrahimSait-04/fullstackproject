import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function CarList({ setSelectedCar }) {
  const [car, setCar] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/car/getCars`);
      setCar(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/car/delete/${id}`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });
      fetchCars();
      return alert("Deleted Sucessfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Ongoing Rental Cant Be Deleted");
      }
      console.log(error);
    }
  };

  const getPucStatus = (expirydate) => {
    const today = new Date();
    const expiry = new Date(expirydate);

    const diff = expiry - today;

    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return {
        status: "Expired",
        message: `Pucc Expired ${Math.abs(daysLeft)} days ago`,
      };
    }

    if (daysLeft <= 10) {
      return {
        status: "Warning",
        message: `PUC Expires in ${daysLeft} days `,
      };
    }
    return {
      status: "valid",
      message: `PUC valid for ${daysLeft} days`,
    };
  };

  const formatDate = (date) => {
    if (!date) return "Not Added";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return "Invalid Date";
    }

    return d.toISOString().split("T")[0];
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Available Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {car.map((c) => {
          const pucStatus = getPucStatus(c.puc);

          return (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
            >
              {/* Car Image */}
              <img
                src={c.img}
                alt={c.carName}
                className="w-full h-56 object-cover"
              />

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Car Name */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {c.carName}
                </h2>

                {/* Price */}
                <p className="text-green-600 text-lg font-bold mb-4">
                  ₹{c.carPrice} / Day
                </p>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-5">
                  {c.description}
                </p>

                {/* Vehicle Details */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Registration:
                    </span>{" "}
                    {c.regNo}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      RC Validity:
                    </span>{" "}
                    {formatDate(c.rc)}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      PUC Validity:
                    </span>{" "}
                    {formatDate(c.puc)}
                  </p>
                </div>

                {/* PUC Warning */}
                <div className="mt-4 min-h-[56px]">
                  {pucStatus.status === "Expired" && (
                    <div className="p-3 rounded-xl bg-red-100 text-red-700 font-semibold text-sm">
                      {pucStatus.message}
                    </div>
                  )}

                  {pucStatus.status === "Warning" && (
                    <div className="p-3 rounded-xl bg-yellow-100 text-yellow-700 font-semibold text-sm">
                      {pucStatus.message}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-auto pt-5">
                  <button
                    onClick={() => setSelectedCar(c)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-lg font-semibold transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
