import React from "react";
import { URL } from "../config";
import axios from "axios";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { getMenu } from "../store/Slices/PizzaSlice";
import toast from "react-hot-toast";

function AdminMenuItem({ key, id, name, image, size, price }) {
  const dispatch = useDispatch();
  
  async function deletePizza() {
    try {
      const response = await axios.delete(`${URL}/delete/${id}`,{
        withCredentials: true,
      });
      toast.success("Item Removed Successfully");
      dispatch(getMenu());
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-200 py-4 my-8">
      <div className="flex flex-col md:flex-row w-[60%] md:w-3/5 bg-white shadow-lg rounded-lg overflow-hidden relative items-center">
        <img className="w-24 h-24 object-cover md:w-40 md:h-40" src={image} alt="Item Image" />

        <div className="w-full md:w-2/3 p-4 text-center md:text-left">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">Price: ₹{price}</p>
          <p className="text-gray-700 text-base">Size: {size}</p>
        </div>

        <button
          className="text-gray-500 text-4xl hover:text-red-600 absolute top-4 right-4 md:relative md:top-0 md:right-0"
          onClick={deletePizza}
        >
          <TiDeleteOutline />
        </button>
      </div>
    </div>
  );
}

export default AdminMenuItem;
