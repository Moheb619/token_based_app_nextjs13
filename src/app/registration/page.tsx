"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Registration = () => {
  const [formValue, SetFormValue] = useState({ email: "", password: "" });
  const router = useRouter();

  const inputChange = (name: string, value: string) => {
    SetFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
  };

  const Submit = async (e: any) => {
    e.preventDefault();
    if (formValue.email.length === 0) {
      alert("Email Required");
    } else if (formValue.password.length === 0) {
      alert("Password Required");
    } else {
      //   const res = await axios.post("api/register", JSON.stringify(formValue));
      const res = await axios.post("api/register", JSON.stringify(formValue), { withCredentials: true });
      if (res.status === 200) {
        window.location.reload();
        router.push("/dashboard");
      }
      if (res.status === 200) {
        const resMail = await axios.post("api/mail", JSON.stringify(formValue), { withCredentials: true });
      }
      //   const config = { method: "POST", body: JSON.stringify(formValue) };
      //   const response = await fetch("/api/register", config);
      //   const json = await response.json();
      //   if (json["status"] === true) {
      //     router.replace("/dashboard");
      //   } else {
      //     alert(json["message"]);
      //   }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={Submit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              value={formValue.email}
              onChange={(e) => inputChange("email", e.target.value)}
              placeholder="example@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              value={formValue.password}
              onChange={(e) => inputChange("password", e.target.value)}
              placeholder="XXXXXXX"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
