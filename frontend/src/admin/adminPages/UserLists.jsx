import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserLists() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/getusers");
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid md:grid-cols-4 gap-8 mt-16">
      <div className="shadow-lg rounded-xl p-8 text-center">
        {user.map((u) => (
          <div key={u.id}>
            <h2>{u.name}</h2>
            <p>{u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
