import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function AddCar({ selectedCar }) {
  const [img, setImg] = useState(null);
  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [description, setDescription] = useState("");
  const [regNo, setRegNo] = useState("");
  const [rc, setRc] = useState("");
  const [puc, setPuc] = useState("");

  const adminToken = localStorage.getItem("adminToken");

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (selectedCar) {
      setCarName(selectedCar.carName);
      setCarPrice(selectedCar.carPrice);
      setDescription(selectedCar.description);
      setRegNo(selectedCar.regNo);
      setRc(formatDate(selectedCar.rc));
      setPuc(formatDate(selectedCar.puc));
    }
  }, [selectedCar]);

  async function handleAddCar(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (img) {
        formData.append("img", img);
      }

      formData.append("carName", carName);
      formData.append("carPrice", carPrice);
      formData.append("description", description);
      formData.append("regNo", regNo);
      formData.append("rc", rc);
      formData.append("puc", puc);

      let res;

      if (selectedCar) {
        res = await axios.put(
          `${API_URL}/api/car/update/${selectedCar._id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${adminToken}`,
            },
          }
        );

        alert("Car Updated Successfully");
      } else {
        res = await axios.post(
          `${API_URL}/api/car/create`,
          formData,
          {
            headers: {
              authorization: `Bearer ${adminToken}`,
            },
          }
        );

        alert("Car Added Successfully");
      }

      console.log(res.data);

      setImg(null);
      setCarName("");
      setCarPrice("");
      setDescription("");
      setRegNo("");
      setRc("");
      setPuc("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto mt-5 w-full max-w-3xl px-3 sm:mt-8 sm:px-4 md:mt-10">
      
      <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-7 md:p-8">
        
        
        <h2 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
          {selectedCar ? "Update Car" : "Add New Car"}
        </h2>

        <form onSubmit={handleAddCar} className="space-y-4 sm:space-y-5">

          {/* Car Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Car Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
              className="
                w-full
                cursor-pointer
                rounded-lg
                border
                p-2
                text-sm
                file:mr-3
                file:rounded-md
                file:border-0
                file:bg-blue-600
                file:px-3
                file:py-2
                file:text-sm
                file:font-semibold
                file:text-white
                hover:file:bg-blue-700
              "
            />
          </div>

          {/* Car Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Car Name
            </label>

            <input
              type="text"
              placeholder="Enter Car Name"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                p-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                sm:text-base
              "
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Price Per Day
            </label>

            <input
              type="number"
              placeholder="Enter Price"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                p-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                sm:text-base
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                resize-y
                rounded-lg
                border
                p-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                sm:text-base
              "
            />
          </div>

          {/* Registration Number */}
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Registration Number
            </label>

            <input
              type="text"
              placeholder="KL-01-AB-1234"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                p-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                sm:text-base
              "
            />
          </div>

          {/* RC */}
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Registration Validity
            </label>

            <input
              type="text"
              placeholder="YYYY-MM-DD"
              value={rc}
              onChange={(e) => setRc(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                p-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                sm:text-base
              "
            />
          </div>

          {/* PUC */}
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              PUC Validity
            </label>

            <input
              type="text"
              placeholder="YYYY-MM-DD"
              value={puc}
              onChange={(e) => setPuc(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                p-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                sm:text-base
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition sm:text-base ${
              selectedCar
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {selectedCar ? "Update Car" : "Add Car"}
          </button>

        </form>
      </div>
    </div>
  );
}