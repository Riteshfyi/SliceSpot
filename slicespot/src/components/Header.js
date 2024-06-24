import React from "react";
import Pizza from "../assets/header_pizza.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Header() {
  const navigate = useNavigate();
  const user = useSelector(state => state.app.user)

  function navigateHandler (){
  
    if(user){
      navigate("/cart")
    }else{
      navigate("/login")
    }


  }

  return (
    <div className="bg-secondary w-[100vw] h-fit p-5 flex flex-row items-center max-[730px]:flex-col max-[730px]:justify-center box-border">
      <div className="w-[50%] flex flex-col items-center justify-center max-[730px]:mx-auto">
        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-col gap-y-1 max-[730px]:text-center text-6xl max-[380px]:text-4xl">
          
              <em className="font-bold">Craving</em>
         

            <em className=" font-bold">Perfection?</em>
          

            <div className="min-[730px]:pl-[1rem] text-2xl">
              {" "}
              Bite into Our Irresistible Pizzas Today!
            </div>
          </div>
          <div className="min-[730px]:pl-[1rem] max-[730px]:flex max-[730px]:mx-auto">
            <button className="bg-primary text-white text-xl leading-8 px-[0.7rem] rounded-full font-bold hover:bg-[#f0611f] " onClick={navigateHandler}>
              Order Now
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row   max-[420px]:hidden  min-[730px]:items-center min-[730px]:justify-center w-[50%] max-[730px]:mt-4">
        <img
          src={Pizza}
          alt="header_pizza"
          className="transition transform ease-in-out delay-100 duration-700 hover:rotate-90"
        />
      </div>
    </div>
  );
}

export default Header;
