import React from "react";
import NavLogo from "../../assets/Attire.png";
import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <div className="flex justify-between p-6 bg-slate-600">
      <div>
        <img src={NavLogo} style={{ width: "5rem" }} alt="Logo" />
      </div>
      <div className="flex gap-8 py-4 text-gray-400">
        <Link className="hover:text-gray-100" to={"/adminhome"}></Link>
        <Link className="hover:text-gray-100" to={"/addCar"}>
          Add Cars
        </Link>
        <Link className="hover:text-gray-100" to={"/getusers"}>
          User List
        </Link>
      </div>
      <div className="flex py-4 text-gray-400">
        <Link className="hover:text-gray-100">Login</Link>
      </div>
    </div>
  );
}
