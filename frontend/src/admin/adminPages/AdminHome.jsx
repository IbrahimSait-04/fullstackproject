import React, { useState } from "react";
import AdminNav from "../adminComponents/AdminNav";
import AddCar from "./AddCar";
import CarList from "./CarList";
import LicenseVerification from "./LicenseVerify";

export default function AdminHome() {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />

      {/* Add / Update Car */}
      <main className="w-full px-3 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8">
        <AddCar
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
        />
      </main>

      {/* Car List */}
      <section className="w-full px-3 pb-5 sm:px-5 md:px-8">
        <CarList setSelectedCar={setSelectedCar} />
      </section>

      {/* License Verification */}
      <section className="w-full px-3 pb-5 sm:px-5 md:px-8">
        <LicenseVerification />
      </section>
    </div>
  );
}