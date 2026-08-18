import React, {useCallback,  useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function LicenseVerification() {
  const [users, setUsers] = useState([]);

  const adminToken = localStorage.getItem("adminToken");


  const fetchUsers =useCallback( async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/getusers`,
        {
          headers: {
            authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  },[adminToken]);

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
        }
      );

      alert(res.data.message);

      // Get the latest user data
      fetchUsers();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message || error.response.data);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        License Verification
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">License</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4 font-semibold">
                  {user.license || "Not Submitted"}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      user.licenseStatus === "Approved"
                        ? "bg-green-100 text-green-700"
                        : user.licenseStatus === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : user.licenseStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.licenseStatus}
                  </span>

                </td>

                <td className="p-4">

                  {user.licenseStatus === "Pending" ? (

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          updateLicenseStatus(
                            user._id,
                            "Approved"
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateLicenseStatus(
                            user._id,
                            "Rejected"
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>

                    </div>

                  ) : (

                    <span className="text-gray-400">
                      No Action
                    </span>

                  )}

                </td>

              </tr>

            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}