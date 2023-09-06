"use client";
import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [cookiesValue, setCookiesValue] = useState<any>("");
  useEffect(() => {
    const fetchCookieValue = async () => {
      try {
        const res = await axios.get("api/getcookies", { withCredentials: true });
        setCookiesValue(res.data?.email);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchCookieValue();
  }, []);
  return (
    <div className="text-center mt-10">
      Hello <span className="text-red-500">{cookiesValue}</span> to your dashboard
    </div>
  );
};

export default Dashboard;
