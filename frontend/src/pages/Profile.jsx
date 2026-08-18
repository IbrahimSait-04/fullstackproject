import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

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

        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);

        // Optional: keep localStorage updated too
        localStorage.setItem("user", JSON.stringify(res.data.user));
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
          bg: "#dcfce7",
          text: "#15803d",
          label: "✓ Approved",
        };

      case "Pending":
        return {
          bg: "#fef3c7",
          text: "#b45309",
          label: "⏳ Pending",
        };

      case "Rejected":
        return {
          bg: "#fee2e2",
          text: "#dc2626",
          label: "✕ Rejected",
        };

      default:
        return {
          bg: "#f1f5f9",
          text: "#64748b",
          label: "Not Added",
        };
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-[calc(100vh-70px)] flex justify-center items-center bg-gray-100">
          <h3 className="text-xl font-semibold text-gray-600">
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

      <div
        className="min-h-[calc(100vh-70px)] flex justify-center items-center"
        style={{
          background: "linear-gradient(135deg, #eff6ff, #e0f2fe, #f8fafc)",
          padding: "50px 20px",
        }}
      >
        <div
          className="bg-white shadow-xl"
          style={{
            width: "520px",
            maxWidth: "100%",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <div
            className="text-white text-center"
            style={{
              padding: "32px 20px",
              background: "linear-gradient(135deg, #0ea5e9, #2563eb, #4f46e5)",
            }}
          >
            <div
              className="mx-auto mb-3 flex justify-center items-center"
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                border: "2px solid rgba(255,255,255,0.4)",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h2 className="fw-bold mb-1">{user?.name || "User"}</h2>

            <p className="mb-0 opacity-75">Manage your account</p>
          </div>

          {/* BODY */}
          <div style={{ padding: "30px" }}>
            {/* PERSONAL INFORMATION */}
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Personal Information</h5>

              <div className="mb-3">
                <label className="fw-semibold text-secondary mb-2 d-block">
                  Full Name
                </label>

                <div
                  className="form-control form-control-lg"
                  style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  {user?.name || "Not Available"}
                </div>
              </div>

              <div>
                <label className="fw-semibold text-secondary mb-2 d-block">
                  Email Address
                </label>

                <div
                  className="form-control form-control-lg"
                  style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  {user?.email || "Not Available"}
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* LICENSE */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Driving License</h5>

                  <small className="text-secondary">
                    Required for renting a car
                  </small>
                </div>

                <span
                  className="px-3 py-2 rounded-pill fw-semibold"
                  style={{
                    background: status.bg,
                    color: status.text,
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {status.label}
                </span>
              </div>

              {/* LICENSE NUMBER */}
              <div
                className="p-3"
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <p className="text-secondary d-block mb-1 fw-bold">
                  License Number:
                </p>

                <span className="fw-semibold">
                  {user?.license || "No license submitted"}
                </span>
              </div>

              {/* ACTION */}
              {user?.licenseStatus !== "Approved" && (
                <Link
                  to="/license"
                  className="btn btn-outline-primary w-100 mt-3"
                  style={{
                    borderRadius: "10px",
                    padding: "11px",
                  }}
                >
                  {user?.license ? "Update License" : "Add Driving License"}
                </Link>
              )}

              {user?.licenseStatus === "Approved" && (
                <div
                  className="text-center mt-3 py-2"
                  style={{
                    color: "#15803d",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  ✓ Your license has been verified by admin
                </div>
              )}

              {user?.licenseStatus === "Rejected" && (
                <div
                  className="text-center mt-3 py-2"
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Your license was rejected. Please update it.
                </div>
              )}
            </div>

            <hr className="my-4" />

            {/* ACCOUNT ACTIONS */}
            <div className="d-grid gap-3">
              <Link
                to="/forgot-password"
                className="btn btn-primary btn-lg"
                style={{
                  borderRadius: "12px",
                  padding: "11px",
                }}
              >
                🔐 Reset Password
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-lg"
                style={{
                  borderRadius: "12px",
                  padding: "11px",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
