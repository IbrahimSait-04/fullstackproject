import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL =
  process.env.NODE_ENV === "production" ? "" :  "http://localhost:5000";

export default function AddLicense() {
  const [license, setLicense] = useState("");

  const nav = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!license.trim()) {
      alert("Please Enter Your Driving License Number");
      return;
    }

    try {
      const res = await axios.put(
        `${API_URL}/api/users/license`,
        {
          license,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      nav("/home");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message || error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-3">Driving License</h1>

        <p className="text-gray-500 text-center mb-8">
          Add your driving license to continue booking cars.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block font-semibold mb-2">
            Driving License Number
          </label>

          <input
            type="text"
            placeholder="Enter your license number"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold"
          >
            Submit License
          </button>
        </form>

        <button
          onClick={() => nav("/")}
          className="w-full mt-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
        >
          Go To Home
        </button>
      </div>
    </div>
  );
}
