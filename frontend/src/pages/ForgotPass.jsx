import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );

      alert(res.data.message);
      nav("/");
    } catch (error) {
      alert(error.response?.data || "Something went wrong");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #eef2ff, #dbeafe, #f8fafc)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "420px",
          borderRadius: "20px",
        }}
      >
        {/* Header */}
        <div
          className="text-center text-white p-4"
          style={{
            borderRadius: "20px 20px 0 0",
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",
          }}
        >
          <h2 className="fw-bold mb-2">Forgot Password</h2>
          <p className="mb-0">
            Enter your registered email address to receive a password reset link.
          </p>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Email Address
              </label>

              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
              >
                Send Reset Link
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/home"
                className="text-decoration-none"
              >
                 Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}