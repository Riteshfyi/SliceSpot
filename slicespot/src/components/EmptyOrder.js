import React, { useEffect } from "react";
import order_page from "../assets/orderpage.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EmptyOrder() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);



  return (
    <div className="py-16 bg-secondary">
      <div className="mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">
          {user ? "No Orders" : "Login to Check Orders"}
        </h1>

        <p className="text-gray-500 text-lg mb-12">
          {user ? "" : "Free Delivery for new users"}
          <br />
         {"Pizza delivery at home. 30 minute or free."}
        </p>

        <img src={order_page} alt="order-image" className="w-2/5 mx-auto h-[80%]" />

        <button
          className="px-6 py-2 rounded-full bg-primary text-white font-bold mt-12 hover:bg-primary_hover"
          onClick={() => {
            if (user) {
              navigate(-1);
            } else {
              navigate("/login");
            }
          }}
        >
          {user ? "Go Back" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default EmptyOrder;
