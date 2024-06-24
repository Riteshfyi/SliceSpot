import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EmptyCart from "../components/EmptyCart";
import cartImg from "../assets/cart-black.png";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { URL } from "../config";
import axios from "axios";
import { getCart } from "../store/Slices/CartSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalprice);
  const showSpinner = useSelector((state) => state.cart.isLoading);

  const [formData, setFormData] = useState({
    no: null,
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function changeHandler(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user]);

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`${URL}/createorder`, formData,{
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/myorders");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      {showSpinner ? (
        <div className="w-screen grow flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grow bg-secondary ">
          {!user || cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="py-4 ">
              <div className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 px-4 ">
                <div className="flex flex-col sm:flex-row items-center border-b border-gray pb-4 mb-4">
                  <img src={cartImg} alt="cart_img_black" className="w-8 h-8" />
                  <h1 className="font-bold text-2xl sm:text-3xl ml-0 sm:ml-4 mt-2 sm:mt-0">
                    Order summary
                  </h1>
                </div>

                <div className="">
                  {cart.map((pizza) => (
                    <CartItem
                      key={pizza._id}
                      id={pizza._id}
                      name={pizza.name}
                      image={pizza.image}
                      price={pizza.price}
                      size={pizza.size}
                      quantity={pizza.quantity}
                    />
                  ))}
                </div>

                <div className="text-right py-4">
                  <div className="mb-4">
                    <span className="text-lg">Total Amount:</span>
                    <span className="text-primary text-2xl font-bold ml-2">
                      {`₹${total}`}
                    </span>
                  </div>

                  <div className="mt-4">
                    <form
                      className="flex flex-col items-end"
                      onSubmit={submitHandler}
                    >
                      <input
                        name="no"
                        type="number"
                        placeholder="Phone Number"
                        value={formData.no}
                        className="w-full sm:w-1/2 p-2 border border-gray mb-4"
                        onChange={changeHandler}
                        required
                      />
                      <input
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        className="w-full sm:w-1/2 p-2 border border-gray"
                        onChange={changeHandler}
                        required
                      />

                      {user ? (
                        <button className="bg-primary rounded-full text-white font-bold px-6 py-2 mt-6">
                          {isLoading ? "Placing..." : "Order Now"}
                        </button>
                      ) : (
                        <button
                          className="bg-primary rounded-full text-white font-bold px-6 py-2 mt-6"
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          Login to continue
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
