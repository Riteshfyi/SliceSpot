import React from "react";
import Card from "./Card";
import image from "../assets/pizza.png";
import axios from "axios";
import { URL } from "../config";
import { useState, useEffect } from "react";
import { getMenu } from "../store/Slices/PizzaSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";


function Menu() {
  const pizzaInfo = useSelector(state => state.shop.pizzaInfo)
 const dispatch = useDispatch();
 const showSpinner = useSelector((state) => state.shop.isLoading);

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  return (
    <div className="">
      {
        showSpinner ? (<div className="h-[30vh] flex flex-row items-center justify-center"><Spinner/></div>) : (<div>
                <div className=" font-bold mt-8 mb-4  flex flex-row justify-center  max-[380px]:text-2xl min-[381px]:text-3xl">
        Our Pizzas
      </div>

      <div className="grid max-[400px]:grid-cols-1 gap-8 min-[401px]:max-md:grid-cols-2 md:grid-cols-3 mb-8">
      {pizzaInfo.map((pizza) => (
        <Card
          key={pizza._id}
          id={pizza._id}
          name={pizza.name}
          image={pizza.image}
          price={pizza.price}
          size={pizza.size}
        />
      ))}
    </div>
        </div>)
      }
    </div>
  );
}

export default Menu;
