import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:5000";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();
  const token = localStorage.getItem("token");

  // Get latest user data from backend
  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!token) {
          nav("/");
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/user/profile`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      } catch (error) {
        console.log(error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          nav("/");
        }
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [token, nav]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/");
  };

  const getStatusStyle = () => {
    switch (user?.licenseStatus) {
      case "Approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          label: "✓ Approved",
        };

      case "Pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "⏳ Pending",
        };

      case "Rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-600",
          label: "✕ Rejected",
        };

      default:
        return {
          bg: "bg-slate-100",
          text: "text-slate-500",
          label: "Not Added",
        };
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-gray-100 px-4">
          <h3 className="text-lg font-semibold text-gray-600 sm:text-xl">
            Loading Profile...
          </h3>
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const status = getStatusStyle();

  return (
    <>
      <Navbar />

      <main
        className="
          flex
          min-h-[calc(100vh-70px)]
          items-start
          justify-center
          px-3
          py-8
          sm:px-5
          sm:py-10
          md:items-center
          md:py-12
        "
        style={{
          background:
            "linear-gradient(135deg, #eff6ff, #e0f2fe, #f8fafc)",
        }}
      >

        {/* Profile Card */}
        <div
          className="
            w-full
            max-w-[520px]
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-xl
            sm:rounded-3xl
          "
        >

          {/* ================= HEADER ================= */}
          <div
            className="
              px-5
              py-7
              text-center
              text-white
              sm:px-6
              sm:py-8
            "
            style={{
              background:
                "linear-gradient(135deg, #0ea5e9, #2563eb, #4f46e5)",
            }}
          >

            {/* Avatar */}
            <div
              className="
                mx-auto
                mb-3
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border-2
                border-white/40
                bg-white/20
                text-2xl
                font-bold
                sm:h-[75px]
                sm:w-[75px]
                sm:text-[32px]
              "
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h2 className="mb-1 text-2xl font-bold sm:text-3xl">
              {user?.name || "User"}
            </h2>

            <p className="text-sm opacity-75 sm:text-base">
              Manage your account
            </p>

          </div>

          {/* ================= BODY ================= */}
          <div className="p-5 sm:p-7 md:p-8">

            {/* Personal Information */}
            <section>

              <h5 className="mb-4 text-lg font-bold text-gray-800 sm:text-xl">
                Personal Information
              </h5>

              {/* Name */}
              <div className="mb-4">

                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Full Name
                </label>

                <div
                  className="
                    min-h-[52px]
                    w-full
                    break-words
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-gray-800
                    sm:text-base
                  "
                >
                  {user?.name || "Not Available"}
                </div>

              </div>

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Email Address
                </label>

                <div
                  className="
                    min-h-[52px]
                    w-full
                    break-all
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-gray-800
                    sm:text-base
                  "
                >
                  {user?.email || "Not Available"}
                </div>

              </div>

            </section>

            <hr className="my-6 border-gray-200 sm:my-7" />

            {/* ================= LICENSE ================= */}
            <section>

              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <h5 className="text-lg font-bold text-gray-800 sm:text-xl">
                    Driving License
                  </h5>

                  <small className="text-sm text-gray-500">
                    Required for renting a car
                  </small>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-2 text-xs font-semibold sm:text-sm ${status.bg} ${status.text}`}
                >
                  {status.label}
                </span>

              </div>

              {/* License Number */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                <p className="mb-1 text-sm font-bold text-gray-600">
                  License Number:
                </p>

                <span className="break-words text-sm font-semibold text-gray-800 sm:text-base">
                  {user?.license || "No license submitted"}
                </span>

              </div>

              {/* Update License */}
              {user?.licenseStatus !== "Approved" && (
                <Link
                  to="/license"
                  className="
                    mt-3
                    block
                    w-full
                    rounded-xl
                    border
                    border-blue-600
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-semibold
                    text-blue-600
                    transition
                    hover:bg-blue-600
                    hover:text-white
                    sm:text-base
                  "
                >
                  {user?.license
                    ? "Update License"
                    : "Add Driving License"}
                </Link>
              )}

              {/* Approved */}
              {user?.licenseStatus === "Approved" && (
                <div className="mt-3 py-2 text-center text-sm font-semibold text-green-700">
                  ✓ Your license has been verified by admin
                </div>
              )}

              {/* Rejected */}
              {user?.licenseStatus === "Rejected" && (
                <div className="mt-3 py-2 text-center text-sm font-semibold text-red-600">
                  Your license was rejected. Please update it.
                </div>
              )}

            </section>

            <hr className="my-6 border-gray-200 sm:my-7" />

            {/* ================= ACCOUNT ACTIONS ================= */}
            <section className="space-y-3">

              <Link
                to="/forgot-password"
                className="
                  block
                  w-full
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                  sm:text-base
                "
              >
                🔐 Reset Password
              </Link>

              <button
                onClick={handleLogout}
                className="
                  w-full
                  rounded-xl
                  border
                  border-red-500
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-500
                  hover:text-white
                  sm:text-base
                "
              >
                Logout
              </button>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}