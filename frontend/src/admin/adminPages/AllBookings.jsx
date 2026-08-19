import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../adminComponents/AdminNav";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function AllBookings() {
  const adminToken = localStorage.getItem("adminToken");
  const [rent, setRent] = useState([]);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/rentals/allbookings`,
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        }
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
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      await axios.put(
        `${API_URL}/api/rentals/cancel-booking/${id}`,
        {},
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        }
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
      "Has the customer returned the car? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await axios.put(
        `${API_URL}/api/rentals/confirm-return/${id}`,
        {},
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        }
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
        `${API_URL}/api/rentals/update-refund/${id}`,
        {
          refundStatus,
        },
        {
          headers: {
            authorization: `bearer ${adminToken}`,
          },
        }
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data || "Failed To Update Refund Status"
      );
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
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <AdminNav />

      <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 sm:py-8 md:px-6 md:py-10">

        {/* Page Header */}
        <h1 className="text-center text-3xl font-bold text-gray-800 sm:text-4xl">
          All Bookings
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500 sm:text-base">
          Manage all customer bookings
        </p>

        {rent.length === 0 ? (
          /* No Bookings */
          <div className="flex min-h-[50vh] items-center justify-center px-2">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg sm:p-10">
              <h2 className="text-2xl font-bold text-red-500 sm:text-3xl">
                No Bookings Found
              </h2>

              <p className="mt-3 text-sm text-gray-500 sm:text-base">
                There are currently no bookings.
              </p>
            </div>
          </div>
        ) : (
          /* Booking Cards */
          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rent.map((r) => (
              <div
                key={r._id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:hover:-translate-y-2"
              >
                {/* Car Image */}
                <img
                  src={r.car ? r.car.img : ""}
                  alt={r.car ? r.car.carName : "Car Deleted"}
                  className="h-48 w-full object-cover sm:h-56 md:h-60"
                />

                <div className="p-4 sm:p-5 md:p-6">

                  {/* Card Header */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0">
                      <h2 className="break-words text-xl font-bold text-gray-800 sm:text-2xl">
                        {r.car ? r.car.carName : "Car Deleted"}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {r.car ? r.car.regNo : "N/A"}
                      </p>
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${getStatusColor(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 break-words text-sm leading-6 text-gray-500 sm:text-base">
                    {r.car ? r.car.description : "N/A"}
                  </p>

                  {/* Customer Details */}
                  <div className="mt-5 border-t pt-4 sm:mt-6 sm:pt-5">
                    <h3 className="mb-4 text-base font-bold text-gray-700 sm:text-lg">
                      Customer Details
                    </h3>

                    <div className="space-y-3 text-sm sm:text-base">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-medium text-gray-600">
                          Name
                        </span>

                        <span className="break-words sm:text-right">
                          {r.user?.name || "N/A"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-medium text-gray-600">
                          Email
                        </span>

                        <span className="break-all sm:max-w-[65%] sm:text-right">
                          {r.user?.email || "N/A"}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="mt-5 border-t pt-4 sm:mt-6 sm:pt-5">
                    <h3 className="mb-4 text-base font-bold text-gray-700 sm:text-lg">
                      📅 Booking Details
                    </h3>

                    <div className="space-y-3 text-sm sm:text-base">

                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium text-gray-600">
                          Pickup
                        </span>

                        <span className="text-right">
                          {new Date(
                            r.pickupDate
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium text-gray-600">
                          Return
                        </span>

                        <span className="text-right">
                          {new Date(
                            r.returnDate
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
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
                  <div className="mt-5 border-t pt-4 sm:mt-6 sm:pt-5">

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base font-bold sm:text-lg">
                        Total Amount
                      </span>

                      <span className="text-2xl font-bold text-green-600 sm:text-3xl">
                        ₹{r.totalPrice}
                      </span>
                    </div>

                    {/* Admin Actions */}
                    <div className="mt-5">

                      {/* Booked */}
                      {r.status === "Booked" && (
                        <button
                          onClick={() => cancelBooking(r._id)}
                          className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-red-700 sm:text-base"
                        >
                          Cancel Booking
                        </button>
                      )}

                      {/* Pending Return */}
                      {r.status === "Pending Return" && (
                        <button
                          onClick={() => confirmReturn(r._id)}
                          className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-green-700 sm:text-base"
                        >
                          Confirm Return
                        </button>
                      )}

                      {/* Returned */}
                      {r.status === "Returned" && (
                        <div className="w-full rounded-xl bg-green-100 py-3 text-center text-sm font-semibold text-green-700 sm:text-base">
                          Rental Completed
                        </div>
                      )}

                      {/* Cancelled */}
                      {r.status === "Cancelled" && (
                        <div className="w-full rounded-xl border border-red-200 bg-red-50 p-3 sm:p-4">

                          <div className="rounded-xl bg-red-100 py-3 text-center text-sm font-semibold text-red-700 sm:text-base">
                            Booking Cancelled
                          </div>

                          <div className="mt-4 space-y-3 text-sm sm:text-base">

                            <div className="flex items-center justify-between gap-4">
                              <span className="font-medium text-gray-600">
                                Refund Amount
                              </span>

                              <span className="font-bold text-green-600">
                                ₹{r.refundAmount || 0}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                              <span className="font-medium text-gray-600">
                                Cancellation Fee
                              </span>

                              <span className="font-bold text-red-600">
                                ₹{r.cancellationFee || 0}
                              </span>
                            </div>

                            {r.refundAmount > 0 ? (
                              <div className="flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">

                                <span className="font-medium text-gray-600">
                                  Refund Status
                                </span>

                                {r.refundStatus === "Pending" && (
                                  <button
                                    onClick={() =>
                                      updateRefundStatus(
                                        r._id,
                                        "Processing"
                                      )
                                    }
                                    className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 sm:w-auto"
                                  >
                                    Start Refund
                                  </button>
                                )}

                                {r.refundStatus === "Processing" && (
                                  <button
                                    onClick={() =>
                                      updateRefundStatus(
                                        r._id,
                                        "Completed"
                                      )
                                    }
                                    className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
                                  >
                                    Mark Completed
                                  </button>
                                )}

                                {r.refundStatus === "Completed" && (
                                  <span className="w-fit rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                                    Completed
                                  </span>
                                )}

                              </div>
                            ) : (
                              <div className="flex items-center justify-between gap-4 border-t pt-3">
                                <span className="font-medium text-gray-600">
                                  Refund Status
                                </span>

                                <span className="text-right font-semibold text-red-600">
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
      </main>
    </div>
  );
}