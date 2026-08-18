import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../adminComponents/AdminNav";

export default function AllBookings() {
  const adminToken = localStorage.getItem("adminToken");
  const [rent, setRent] = useState([]);

  const fetchBookings = useCallback(async () => {
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
  }, [adminToken]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  const cancelBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    try {
      await axios.put(
        `http://localhost:5000/api/rentals/cancel-booking/${id}`,
        {},
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        },
      );

      alert("Booking cancelled successfully.");
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to cancel booking.");
    }
  };
  const confirmReturn = async (id) => {
    const confirmed = window.confirm(
      "Has the customer returned the car? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      await axios.put(
        `http://localhost:5000/api/rentals/confirm-return/${id}`,
        {},
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        },
      );

      alert("Rental marked as returned successfully.");
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to confirm return.");
    }
  };

  const updateRefundStatus = async (id, refundStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/rentals/update-refund/${id}`,
        {
          refundStatus,
        },
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        },
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert(error.response?.data || "Failed To Update Refund Status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "bg-blue-100 text-blue-700";

      case "Pending Return":
        return "bg-gray-100 text-gray-700";

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
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {r.car ? r.car.carName : "Car Deleted"}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {r.car ? r.car.regNo : "N/A"}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        r.status,
                      )}`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <p className="text-gray-500 mt-4">
                    {r.car ? r.car.description : "N/A"}
                  </p>

                  {/* Customer */}
                  <div className="mt-6 border-t pt-5">
                    <h3 className="font-bold text-lg text-gray-700 mb-4">
                      Customer Details
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Name</span>
                        <span>{r.user?.name}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Email</span>
                        <span className="text-sm">{r.user?.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking */}
                  <div className="mt-6 border-t pt-5">
                    <h3 className="font-bold text-lg text-gray-700 mb-4">
                      📅 Booking Details
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Pickup
                        </span>

                        <span>
                          {new Date(r.pickupDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Return
                        </span>

                        <span>
                          {new Date(r.returnDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Rent / Day
                        </span>

                        <span className="font-bold text-sky-600">
                          ₹{r.car?.carPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-6 border-t pt-5">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Amount</span>

                      <span className="text-3xl font-bold text-green-600">
                        ₹{r.totalPrice}
                      </span>
                    </div>

                    {/* Admin Actions */}

                    <div className="mt-6 flex gap-3">
                      {r.status === "Booked" && (
                        <button
                          onClick={() => cancelBooking(r._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition duration-300"
                        >
                          Cancel Booking
                        </button>
                      )}

                      {r.status === "Pending Return" && (
                        <button
                          onClick={() => confirmReturn(r._id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300"
                        >
                          Confirm Return
                        </button>
                      )}

                      {r.status === "Returned" && (
                        <div className="w-full bg-green-100 text-green-700 text-center py-3 rounded-xl font-semibold">
                          Rental Completed
                        </div>
                      )}

                      {r.status === "Cancelled" && (
                        <div className="w-full bg-red-50 border border-red-200 rounded-xl p-4">
                          <div className="bg-red-100 text-red-700 text-center py-3 rounded-xl font-semibold">
                            Booking Cancelled
                          </div>

                          <div className="mt-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-600">
                                Refund Amount
                              </span>

                              <span className="font-bold text-green-600">
                                ₹{r.refundAmount || 0}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="font-medium text-gray-600">
                                Cancellation Fee
                              </span>

                              <span className="font-bold text-red-600">
                                ₹{r.cancellationFee || 0}
                              </span>
                            </div>

                            {r.refundAmount > 0 ? (
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">
                                  Refund Status
                                </span>

                                {r.refundStatus === "Pending" && (
                                  <button
                                    onClick={() =>
                                      updateRefundStatus(r._id, "Processing")
                                    }
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold"
                                  >
                                    Start Refund
                                  </button>
                                )}

                                {r.refundStatus === "Processing" && (
                                  <button
                                    onClick={() =>
                                      updateRefundStatus(r._id, "Completed")
                                    }
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                                  >
                                    Mark Completed
                                  </button>
                                )}

                                {r.refundStatus === "Completed" && (
                                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                                    Completed
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Refund Status
                                </span>

                                <span className="text-red-600 font-semibold">
                                  Not Eligible
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
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
