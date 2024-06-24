import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { URL } from "../config";
import { setUser, setLoading } from "../store/Slices/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.app.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setLoading(true);
      let response = await axios.post(`${URL}/login`, formData, {
        withCredentials: true,
      });

      dispatch(setUser(response.data.success));

      if (response.data.success) {
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="bg-secondary h-[89vh]  pt-[5rem] grow">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900">Sign in</h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                id="email"
                onChange={changeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium "
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                id="password"
                onChange={changeHandler}
                placeholder="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-hover_primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-hover_primary dark:focus:ring-primary"
              onClick={submitHandler}
            >
              {isLoading ? "loading..." : "Login"}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <NavLink
                to="/register"
                className="ms-auto text-sm text-primary hover:underline dark:text-primary "
              >
                Register here
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
