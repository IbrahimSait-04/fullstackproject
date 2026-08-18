import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../adminComponents/AdminNav";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function UserLists() {
  const adminToken = localStorage.getItem("adminToken");
  
  const [user, setUser] = useState([]);

  const fetchUsers =useCallback( async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/getusers`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  },[adminToken]);

  //To Fetch User When Component Loads
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBan = useCallback(
    async (id) => {
      try {
        await axios.put(
          `${API_URL}/api/toggleBan/${id}`,
          {},
          {
            headers: {
              authorization: `Bearer ${adminToken}`,
            },
          },
        );
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    },
    [adminToken, fetchUsers],
  );


  return (
    <div>
      <AdminNav />
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Registered Users
        </h1>

        {/* User Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {user.map((u, index) => (
            <div
              key={u._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
            >
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-sky-600 text-white flex items-center justify-center text-3xl font-bold">
                  {u.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Details */}
              <div className="text-center mt-5">
                <h2 className="text-xl font-bold text-gray-800">{u.name}</h2>

                <p className="text-gray-500 mt-2 break-words">{u.email}</p>
              </div>
              <button
                onClick={() => handleBan(u._id)}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${
                  u.ban
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {u.ban ? "Unban" : "Ban"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
