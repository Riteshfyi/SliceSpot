import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GiFullPizza } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/Slices/UserSlice";
import { URL } from "../config";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
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
    <nav className="flex flex-col items-center sm:flex-row sm:justify-between w-[100vw] sm:h-[5rem] sm:items-center">
      <div
        className=" flex flex-row items-center mx-[2.5rem] transition ease-in-out delay-[300] scale-[110%] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <GiFullPizza className="text-primary text-5xl max-[380px]:hidden" />
        <div className="flex max-[260px]:hidden text-[30px]">
          <div className="font-black  tracking-tighter text-[#FFAD29] underline decoration-green-600">
            Slice
          </div>
          <div className="font-black tracking-tighter text-[#ecd92b] underline decoration-green-600">
            Spot
          </div>
        </div>
      </div>

      <button
        onClick={toggleMenu}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-cta"
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
        } w-full sm:flex sm:w-auto sm:order-1 flex-col sm:flex-row justify-center gap-2 sm:gap-[2rem] mx-[2rem]`}
        id="navbar-cta"
      >
        <ul className="flex flex-col items-center sm:flex-row gap-2 sm:gap-[1.8rem] ">
          <li>
            <button
              className="text-dark transition ease-in-out delay-[300] hover:text-primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Menu
            </button>
          </li>
          {!user && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="text-dark transition ease-in-out delay-[300] hover:text-primary"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="text-dark transition ease-in-out delay-[300] hover:text-primary"
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <button
                  className="text-dark transition ease-in-out delay-[300] hover:text-primary"
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  className="text-dark transition ease-in-out delay-[300] hover:text-primary"
                  onClick={logOutHandler}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <li>
            <FiShoppingBag
              className="text-2xl hover:text-primary cursor-pointer"
              onClick={() => {
                navigate("/cart");
              }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
