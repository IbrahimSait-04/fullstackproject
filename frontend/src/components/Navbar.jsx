import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "../assets/Imperial-Logo.png";

export default function Navbar() {
  const nav = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/");
  };

  return (
    <div className="flex justify-between p-6 bg-slate-600">
      <div>
        <img src={NavLogo} style={{ width: "5rem" }} alt="Logo" />
      </div>
      <div className="flex gap-8 py-4 text-gray-400">
        <Link className=" hover:text-gray-100" to={"/home"}>
          Home
        </Link>
        <Link className=" hover:text-gray-100" to={"/myrentals"}>
          My Rents
        </Link>
        <Link className=" hover:text-gray-100">About Us</Link>
        <Link className=" hover:text-gray-100">Contact</Link>
      </div>
      {token ? (
        <button className="hover:text-gray-100" onClick={handleLogOut}>
          LogOut
        </button>
      ) : (
        <Link className="hover:text-gray-100" to={"/"}>
          LogIn
        </Link>
      )}
    </div>
  );
}
