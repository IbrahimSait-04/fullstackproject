import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../adminComponents/AdminNav";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function UserLists() {
  const adminToken = localStorage.getItem("adminToken");

  const [user, setUser] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/getusers`,
        {
          headers: {
            authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [adminToken]);

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
          }
        );

        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    },
    [adminToken, fetchUsers]
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">

      <AdminNav />

      <main className="px-3 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10">

        {/* Heading */}
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl md:mb-10 md:text-4xl">
          Registered Users
        </h1>

        {/* User Cards */}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4 xl:gap-8">

          {user.map((u) => (
            <div
              key={u._id}
              className="
                flex
                flex-col
                items-center
                rounded-2xl
                bg-white
                p-5
                shadow-lg
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                sm:p-6
                md:hover:-translate-y-2
              "
            >

              {/* Avatar */}
              <div className="flex justify-center">
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-sky-600
                    text-2xl
                    font-bold
                    text-white
                    sm:h-20
                    sm:w-20
                    sm:text-3xl
                  "
                >
                  {u.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Details */}
              <div className="mt-4 w-full text-center sm:mt-5">

                <h2 className="break-words text-lg font-bold text-gray-800 sm:text-xl">
                  {u.name}
                </h2>

                <p className="mt-2 break-all text-sm text-gray-500 sm:text-base">
                  {u.email}
                </p>

              </div>

              {/* Ban Button */}
              <button
                onClick={() => handleBan(u._id)}
                className={`
                  mt-5
                  w-full
                  rounded-lg
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  sm:text-base
                  ${
                    u.ban
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }
                `}
              >
                {u.ban ? "Unban" : "Ban"}
              </button>

            </div>
          ))}

        </div>
      </main>
    </div>
  );
}