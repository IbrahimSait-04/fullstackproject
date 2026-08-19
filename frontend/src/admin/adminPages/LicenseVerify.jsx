import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function LicenseVerification() {
  const [users, setUsers] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/getusers`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateLicenseStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/admin/license-status/${id}`,
        { status },
        {
          headers: {
            authorization: `Bearer ${adminToken}`,
          },
        },
      );

      alert(res.data.message);

      fetchUsers();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message || error.response.data);
      }
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <section className="w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-5 sm:py-8 md:px-6 md:py-10">
        {/* Heading */}
        <h1 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
          License Verification
        </h1>

        {/* ================= MOBILE ================= */}
        <div className="space-y-4 md:hidden">
          {users.map((user) => (
            <div key={user._id} className="rounded-2xl bg-white p-5 shadow-lg">
              {/* Name */}
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Name
                </p>

                <p className="mt-1 break-words text-lg font-bold text-gray-800">
                  {user.name}
                </p>
              </div>

              {/* Email */}
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-gray-600">
                  {user.email}
                </p>
              </div>

              {/* License */}
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  License
                </p>

                <p className="mt-1 break-words font-semibold text-gray-800">
                  {user.license || "Not Submitted"}
                </p>
              </div>

              {/* Status */}
              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </p>

                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                    user.licenseStatus,
                  )}`}
                >
                  {user.licenseStatus}
                </span>
              </div>

              {/* Actions */}
              {user.licenseStatus === "Pending" ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => updateLicenseStatus(user._id, "Approved")}
                    className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 sm:w-auto sm:flex-1"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateLicenseStatus(user._id, "Rejected")}
                    className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto sm:flex-1"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 py-3 text-center text-sm text-gray-400">
                  No Action
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ================= TABLET + DESKTOP ================= */}
        <div className="hidden overflow-hidden rounded-2xl bg-white shadow-lg md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="whitespace-nowrap p-4 text-left">Name</th>

                  <th className="whitespace-nowrap p-4 text-left">Email</th>

                  <th className="whitespace-nowrap p-4 text-left">License</th>

                  <th className="whitespace-nowrap p-4 text-left">Status</th>

                  <th className="whitespace-nowrap p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    {/* Name */}
                    <td className="p-4">
                      <span className="break-words">{user.name}</span>
                    </td>

                    {/* Email */}
                    <td className="p-4">
                      <span className="break-all text-sm">{user.email}</span>
                    </td>

                    {/* License */}
                    <td className="p-4 font-semibold">
                      {user.license || "Not Submitted"}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                          user.licenseStatus,
                        )}`}
                      >
                        {user.licenseStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-4">
                      {user.licenseStatus === "Pending" ? (
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              updateLicenseStatus(user._id, "Approved")
                            }
                            className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateLicenseStatus(user._id, "Rejected")
                            }
                            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">No Action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
