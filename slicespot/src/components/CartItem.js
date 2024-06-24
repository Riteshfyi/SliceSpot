import React from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { URL } from "../config";
import { useDispatch } from "react-redux";
import { getCart } from "../store/Slices/CartSlice";
import axios from "axios";
import toast from "react-hot-toast";

function CartItem(props) {
  const dispatch = useDispatch();

  const incrementQuantity = async () => {
    try {
      await axios.post(`${URL}/add`, { itemId: props.id },{
        withCredentials: true,
      });
      dispatch(getCart());
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const decrementQuantity = async () => {
    try {
      await axios.post(`${URL}/remove`, { itemId: props.id },{
        withCredentials: true,
      });
      dispatch(getCart());
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center py-8 border-b border-gray-300 border-dashed">
      <img src={props.image} alt="cartItem-image" className="w-24 mb-4 md:mb-0" />
      <div className="md:ml-4 flex-1 text-center md:text-left">
        <h1 className="text-lg font-medium">{props.name}</h1>
        <span className="uppercase text-gray-600">{props.size}</span>
      </div>

      <div className="flex-1 flex justify-center md:justify-start">
        <div className="flex flex-row items-center gap-2">
          <div>{props.quantity} Pcs</div>
          <div className="flex gap-1">
            <button onClick={incrementQuantity}>
              <FiPlusCircle className="text-xl" />
            </button>
            <button onClick={decrementQuantity}>
              <FiMinusCircle className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <span className="font-bold text-lg text-center md:text-left mt-4 md:mt-0">₹{props.price}</span>
    </div>
  );
}

export default CartItem;
