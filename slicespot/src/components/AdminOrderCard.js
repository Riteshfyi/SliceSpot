import React, { useState } from "react";
import pizza_box from "../assets/pizzabox.png";
import axios from "axios";
import { URL } from "../config";
import toast from "react-hot-toast";

function AdminOrderCard(props) {
  const { items, status, amount, no, address, orderedAt } = props.order;
  const fetchOrders = props.fetchOrders;

  const changeHandler = async (event) => {
    try {
      const response = await axios.post(`${URL}/updatestatus`, { orderId: props.order._id, status: event.target.value },{
        withCredentials: true,
      });

      toast.success("Status Updated");
      fetchOrders();
    } catch (e) {
      toast.success(e.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-between items-start flex-1 text-sm py-4 px-4 md:px-6 text-dark border border-orange-400 bg-white rounded-lg shadow-md space-y-3 md:space-y-4 my-6 md:my-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">
        <img src={pizza_box} alt="pizza-box" className="w-10 h-10 md:w-12 md:h-12" />
        <div className="flex flex-col flex-1 px-2 md:px-4 text-center md:text-left">
          <p className="text-base md:text-lg font-semibold">
            {items.map((item, index) => (
              <span key={index}>
                {item.name} ({item.size}) X {item.quantity}
                {index !== items.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Items: {items.length}</p>
        </div>
        <div className="text-center md:text-right md:mr-2">
          <p className="text-base md:text-lg font-semibold">₹{amount}.00</p>
          <p className={`text-xs md:text-sm font-semibold ${status === "Pending" ? "text-orange-500" : status === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
            <span className="mr-1">•</span>{status}
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <select
            className="w-full md:w-auto border-0 py-1 md:py-2 px-2 md:px-4 rounded bg-orange-400 text-white font-semibold transition duration-200"
            value={status}
            onChange={changeHandler}
          >
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="w-full text-center md:text-left">
        <p className="text-xs md:text-sm font-semibold text-gray-600">Phone Number: {no}</p>
        <p className="text-xs md:text-sm font-semibold text-gray-600">Address: {address}</p>
        <p className="text-xs md:text-sm font-semibold text-gray-600">Date: {new Date(orderedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default AdminOrderCard;
