import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AddCar({ selectedCar, setSelectedCar }) {
  const [img, setImg] = useState(null);
  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [description, setDescription] = useState("");
  const [regNo, setRegNo] = useState("");

  const [car, setCar] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/car/getCars");
      setCar(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCar) {
      setCarName(selectedCar.carName);
      setCarPrice(selectedCar.carPrice);
      setDescription(selectedCar.description);
      setRegNo(selectedCar.regNo);
    }
  }, [selectedCar]);

  async function handleAddCar(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("carName", carName);
      formData.append("carPrice", carPrice);
      formData.append("description", description);
      formData.append("regNo", regNo);

      let res;
      if (selectedCar) {
        res = await axios.put(
          `http://localhost:5000/api/car/update/${selectedCar._id}`,
          formData,
        );
        alert("Car Updated Succesfully");
      } else {
        res = await axios.post(
          "http://localhost:5000/api/car/create",
          formData,
        );
        alert("Car Added Suucesfully");
      }

      console.log(res.data);

      alert("Car Added Succesfullly");

      setImg(null);
      setCarName("");
      setCarPrice("");
      setDescription("");
      setRegNo("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        {selectedCar ? "Update Car" : "Add New Car"}
      </h2>

      <form onSubmit={handleAddCar} className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold">Car Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Car Name</label>

          <input
            type="text"
            placeholder="Enter Car Name"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Price Per Day</label>

          <input
            type="number"
            placeholder="Enter Price"
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>

          <textarea
            rows="4"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Registration Number
          </label>

          <input
            type="text"
            placeholder="KL-01-AB-1234"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            selectedCar
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {selectedCar ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
}
