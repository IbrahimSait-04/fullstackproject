import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CarList({ setSelectedCar }) {
  const [car, setCar] = useState([]);

  const adminToken = localStorage.getItem("adminToken")

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/car/getCars",);
      setCar(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/car/delete/${id}`,{
        headers:{
          authorization: `Bearer ${adminToken}`
        }
      }
      );
      fetchCars();
      return alert("Deleted Sucessfully")
      
    } catch (error) {
      if(error.response && error.response.status===400){
        alert("Ongoing Rental Cant Be Deleted")
      }
      console.log(error);
    }

  }
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Available Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {car.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={c.img}
              alt={c.carName}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold mb-3">{c.carName}</h2>

              <p className="text-green-600 text-lg font-semibold mb-2">
                ₹{c.carPrice} / Day
              </p>

              <p className="text-gray-600 mb-3">{c.description}</p>

              <p className="text-sm text-gray-500 mb-5">
                <span className="font-semibold">Registration:</span> {c.regNo}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedCar(c)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  Edit
                </button>

                <button onClick={()=> handleDelete(c._id)} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
