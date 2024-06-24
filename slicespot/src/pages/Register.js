import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { URL } from "../config";
import { useSelector , useDispatch} from "react-redux";
import { setLoading } from "../store/Slices/UserSlice";
import toast from 'react-hot-toast';



function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.app.user);
  const [isLoading , setIsLoading ] = useState(false);

  if(user){
    navigate("/");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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
      const response = await axios.post(`${URL}/signup`, formData, {
        withCredentials: true,
      });
      if(response.data.success){
        toast.success("Successfully Registered");
        navigate("/login");
      }
    } catch (err) {
      
       toast.error(err.response.data.message)
    }finally{
   setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-secondary  py-[5rem] grow">
        <div className="w-full max-w-sm p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8   mx-auto ">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 ">Sign up</h5>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                Your name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                value={formData.name}
                onChange={changeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={changeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-hover_primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-hover_primary dark:focus:ring-primary"
              onClick={submitHandler}
            >
             {isLoading ? "loading..." : "Register"}
            </button>
            <div className="text-sm font-medium text-gray-500">
              Already registered?{" "}
              <button
                className="ms-auto text-sm text-primary hover:underline dark:text-primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                 {isLoading ? "loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   
  );
}

export default Register;
