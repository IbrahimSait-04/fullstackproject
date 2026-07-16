import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Attire-Logo.png";
import titleimg from "../assets/title_img.png";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.authToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        nav("/home");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="relative w-full h-screen">

      {/* Background */}
      <img
        src={titleimg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <div className="relative z-10 flex justify-center items-center h-full">

        <form
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-[380px] p-10"
        >

          <div className="flex justify-center mb-6">
            <img
              src={Logo}
              alt="logo"
              className="w-28"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Welcome Back
          </h2>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg mb-5 outline-none"
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
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold duration-300"
          >
            Login
          </button>

          <p className="text-center text-white mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-sky-300 hover:underline"
            >
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}