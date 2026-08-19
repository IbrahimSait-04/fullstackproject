import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Imperial-Logo.png";
import titleimg from "../../assets/title_img.png";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function AdminLogin() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/admin/adminlogin`,
        {
          email,
          password,
        }
      );

      console.log(res.data);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.adminToken);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        nav("/adminhome");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Background */}
      <img
        src={titleimg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        
        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="
            w-full max-w-[380px]
            rounded-2xl
            border border-white/20
            bg-white/10
            p-6
            shadow-2xl
            backdrop-blur-lg
            sm:p-8
            md:p-10
          "
        >
          {/* Logo */}
          <div className="mb-5 flex justify-center sm:mb-6">
            <img
              src={Logo}
              alt="logo"
              className="w-20 sm:w-24 md:w-28"
            />
          </div>

          {/* Heading */}
          <h2 className="mb-6 text-center text-2xl font-bold text-white sm:mb-8 sm:text-3xl">
            Welcome Back
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="
              mb-4
              w-full
              rounded-lg
              p-3
              text-sm
              outline-none
              sm:mb-5
              sm:text-base
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="
              mb-5
              w-full
              rounded-lg
              p-3
              text-sm
              outline-none
              sm:mb-6
              sm:text-base
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              rounded-lg
              bg-sky-600
              py-3
              text-sm
              font-semibold
              text-white
              duration-300
              hover:bg-sky-700
              sm:text-base
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}