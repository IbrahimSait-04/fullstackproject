import React, { useState } from "react";
import AdminNav from "../adminComponents/AdminNav";
import AddCar from "./AddCar";
import CarList from "./CarList";
import LicenseVerification from "./LicenseVerify";


export default function AdminHome() {
  const [selectedCar, setSelectedCar] = useState(null);
  return (
    <div>
      <AdminNav />
      <div className="flex p-5">
        <AddCar selectedCar={selectedCar} setSelectedCar={setSelectedCar} />
      </div>
      <CarList setSelectedCar={setSelectedCar} />

      <LicenseVerification />
    </div>
  );
}
