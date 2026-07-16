import React from "react";
import { Link } from "react-router-dom";
import NavLogo from "../assets/Imperial-Logo.png";

export default function Navbar() {
  return (
    <div className="flex justify-between p-6 bg-slate-600">
      <div>
        <img src={NavLogo} style={{width:"5rem"}} alt="Logo" />
      </div>
       <div className="flex gap-8 py-4 text-gray-400">
          <Link className=" hover:text-gray-100" to={"/home"}>Home</Link>
          <Link className=" hover:text-gray-100">Rents</Link>
          <Link className=" hover:text-gray-100">About Us</Link>
          <Link className=" hover:text-gray-100">Services</Link>
          <Link className=" hover:text-gray-100">Contact</Link>
        </div>
        <div className="flex py-4 text-gray-400">
            <Link className=" hover:text-gray-100">Login</Link>
        </div>
    </div>
  );
}
