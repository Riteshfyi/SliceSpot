import React, { useState } from "react";
import { GiFullPizza } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { URL } from "../config";
import axios from "axios";
import { FaCirclePlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../store/Slices/UserSlice";

function AdminNav() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function logOutHandler() {
    try {
      const response = await axios.get(`${URL}/logout`,{
        withCredentials: true,
      });
      dispatch(setUser(false));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-col items-center sm:flex-row sm:justify-between w-full sm:h-20 sm:items-center">
      <div
        className="flex flex-row items-center mx-10 transition ease-in-out delay-300 scale-110 cursor-pointer"
        onClick={() => {
          navigate("/admin");
        }}
      >
        <GiFullPizza className="hidden  min-[380px]:block text-primary text-5xl" />
        <div className="flex text-3xl mx-2 max-[260px]:hidden">
          <div className="font-black text-primary tracking-tighter underline decoration-green-600">
            Slice
          </div>
          <div className="font-black text-yellow-400 tracking-tighter underline decoration-green-600">
            Spot
          </div>
          <div className="ml-1 font-black tracking-tighter">
            /Admin
          </div>
        </div>
      </div>

      <button
        onClick={toggleMenu}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
        aria-controls="admin-navbar-cta"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full sm:flex sm:w-auto sm:order-1 flex-col sm:flex-row justify-center gap-2 sm:gap-8 mx-8`}
        id="admin-navbar-cta"
      >
        <ul className="flex flex-col items-center sm:flex-row gap-2 sm:gap-6">
          <li>
            <button
              className="text-dark transition ease-in-out delay-300 hover:text-primary"
              onClick={() => {
                navigate("/admin/");
              }}
            >
              Menu
            </button>
          </li>
          <li>
            <button
              className="text-dark transition ease-in-out delay-300 hover:text-primary"
              onClick={() => {
                navigate("/admin/orders");
              }}
            >
              Orders
            </button>
          </li>
          <li>
            <FaCirclePlus
              className="text-2xl hover:text-primary cursor-pointer"
              onClick={() => {
                navigate("/admin/add");
              }}
            />
          </li>
          <li>
            <button
              className="text-dark transition ease-in-out delay-300 hover:text-primary"
              onClick={logOutHandler}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNav;
