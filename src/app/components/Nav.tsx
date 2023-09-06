"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
const Nav = () => {
  const router = useRouter();
  const logout = async () => {
    const res = await axios.get("api/register", { withCredentials: true });
    if (res.status === 200) {
      router.push("/");
    }
  };
  return (
    <div className="flex flex-row space-x-10 items-center justify-center bg-gray-500 text-white p-5">
      <div className="hover:bg-black hover:text-white">
        {" "}
        <Link href={"/"}>Home</Link>
      </div>
      <div className="hover:bg-black hover:text-white">
        {" "}
        <Link href={"/registration"}>Registration</Link>
      </div>
      <div className="hover:bg-black hover:text-white">
        {" "}
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
      <div className="hover:bg-black hover:text-white">
        {" "}
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;
