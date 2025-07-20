// app/register/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ClientRegister = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "STAFF",
  });

  const [error, setError] = useState("");

 
  
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic Validation
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Registration failed.");
        return;
      }

      router.push("/login"); // or redirect as needed
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
     
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border"
        >
          <option value="STAFF">Staff</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default ClientRegister;
