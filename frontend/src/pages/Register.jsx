import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Imperial-Logo.png";
import titleimg from "../assets/title_img.png";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    //Email Validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //PasswordRegex

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    if(!emailRegex.test(email)){
      alert("Please Enter a valid email")
      return;
    }

    if(!passwordRegex.test(password)){
      alert("Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number.")
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      console.log(res.data);

      alert("Registration Successful");
      nav("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("This email id is already registered");
      } else {
        alert(error.response?.data?.message ||
          error.response?.data ||
          "Registration failed");
      }
    }
  }

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={titleimg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Register Card */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <form
          onSubmit={handleRegister}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-[400px] p-10"
        >
          <div className="flex justify-center mb-5">
            <img src={Logo} alt="Logo" className="w-28" />
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg mb-4 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg mb-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg mb-6 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Register
          </button>

          <p className="text-center text-white mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-sky-300 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
