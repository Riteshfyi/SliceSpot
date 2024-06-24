import React from "react";
import { URL } from "../config";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

function Card(props) {
  const user = useSelector((state) => state.app.user);

  async function addToCartHandler() {
    if (user) {
      try {
        await axios.post(`${URL}/add`, { itemId: props.id },{
          withCredentials: true,
        });
        toast.success("Added to Cart");
      } catch (err) {
        toast.error("Error, couldn't add to cart");
      }
    } else {
      toast.error("Login to add to cart!");
    }
  }

  return (
    <div className="max-w-xs mx-auto py-8 md:max-w-sm lg:max-w-md">
      <img
        src={props.image}
        alt="card-image"
        className="h-40 mb-4 mx-auto w-40 object-cover md:h-48 md:w-48 lg:h-56 lg:w-56"
      />
      <div className="text-center">
        <div className="mb-4 text-lg md:text-xl lg:text-2xl">{props.name}</div>
        <span className="bg-secondary py-1 px-4 rounded-full uppercase text-xs md:text-sm lg:text-base">
          {props.size}
        </span>
        <div className="flex items-center justify-around mt-3 md:mt-4">
          <span className="font-bold text-lg mt-auto pr-8 md:text-xl lg:text-2xl">
            ₹{props.price}
          </span>
          <button
            className="py-1 px-2 rounded-full flex items-center font-bold text-primary hover:text-white hover:bg-primary"
            onClick={addToCartHandler}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
