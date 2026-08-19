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
      return alert("Deleted Successfully");
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

    const daysLeft = Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return {
        status: "Expired",
        message: `PUC Expired ${Math.abs(daysLeft)} days ago`,
      };
    }

    if (daysLeft <= 10) {
      return {
        status: "Warning",
        message: `PUC Expires in ${daysLeft} days`,
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
    <section className="w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-5 sm:py-8 md:px-6 md:py-10">

        {/* Heading */}
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl md:mb-10">
          Available Cars
        </h1>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">

          {car.map((c) => {
            const pucStatus = getPucStatus(c.puc);

            return (
              <div
                key={c._id}
                className="
                  flex
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-lg
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                  md:hover:-translate-y-2
                "
              >

                {/* Car Image */}
                <img
                  src={c.img}
                  alt={c.carName}
                  className="h-48 w-full object-cover sm:h-52 md:h-56"
                />

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">

                  {/* Car Name */}
                  <h2 className="mb-2 break-words text-xl font-bold text-gray-800 sm:text-2xl">
                    {c.carName}
                  </h2>

                  {/* Price */}
                  <p className="mb-4 text-base font-bold text-green-600 sm:text-lg">
                    ₹{c.carPrice} / Day
                  </p>

                  {/* Description */}
                  <p className="mb-5 break-words text-sm leading-relaxed text-gray-600 sm:text-base">
                    {c.description}
                  </p>

                  {/* Vehicle Details */}
                  <div className="space-y-3 border-t border-gray-200 pt-4">

                    <p className="break-words text-sm text-gray-600">
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
                      <div className="rounded-xl bg-red-100 p-3 text-sm font-semibold text-red-700">
                        {pucStatus.message}
                      </div>
                    )}

                    {pucStatus.status === "Warning" && (
                      <div className="rounded-xl bg-yellow-100 p-3 text-sm font-semibold text-yellow-700">
                        {pucStatus.message}
                      </div>
                    )}

                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <button
                      onClick={() => setSelectedCar(c)}
                      className="
                        w-full
                        rounded-lg
                        bg-yellow-500
                        px-6
                        py-2.5
                        font-semibold
                        text-white
                        transition
                        hover:bg-yellow-600
                        sm:w-auto
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="
                        w-full
                        rounded-lg
                        bg-red-500
                        px-6
                        py-2.5
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-600
                        sm:w-auto
                      "
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
    </section>
  );
}