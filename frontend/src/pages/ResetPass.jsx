import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPass() {
  const { id, token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/reset-password/${id}/${token}`,
        {
          password,
        }
      );

      alert(res.data.message);
      nav("/");
    } catch (error) {
      alert(error.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="form-control mb-4"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}