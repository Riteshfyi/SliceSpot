import React from "react";
import empty_cart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EmptyCart() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);

  return (
    <div className="py-16 bg-secondary flex flex-col items-center justify-center max-h-screen">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">
          {user ? "Cart Empty☹️" : "Login to Add to Cart"}
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          {user
            ? "You probably haven't ordered a pizza yet."
            : "Join Us and Taste Perfection."}
          <br />
          {user ? "To order a pizza, go to the main pizza." : ""}
        </p>
        <img
          src={empty_cart}
          alt="empty-cart"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-8 "
        />
        <button
          className="px-6 py-2 rounded-full bg-primary text-white font-bold hover:bg-primary_hover"
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

export default EmptyCart;
