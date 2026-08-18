import React from "react";
import NavLogo from "../../assets/Imperial-Logo.png";
import { Link, useNavigate } from "react-router-dom";



export default function AdminNav() {
  const token = localStorage.getItem("adminToken");

  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
    nav("/adminLogin");
  };
  return (
    <div className="flex justify-between p-6 bg-slate-600">
      <div>
        <img src={NavLogo} style={{ width: "5rem" }} alt="Logo" />
      </div>
      <div className="flex gap-8 py-4 text-gray-400">
        <Link className="hover:text-gray-100" to={"/adminhome"}>
          Home
        </Link>
        <Link className="hover:text-gray-100" to={"/getusers"}>
          User List
        </Link>
        <Link className="hover:text-gray-100" to={"/allbooking"}>
          All Bookings
        </Link>
      </div>
      {token ? (
        <button className="hover:text-gray-100" onClick={handleLogOut}>
          LogOut
        </button>
      ) : (
        <Link className="hover:text-gray-100" to={"/adminLogin"}>
          LogIn
        </Link>
      )}
    </div>
  );
}
