import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Order from "./pages/MyOrders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "./config";
import axios from "axios";
import { setUser, setRole } from "./store/Slices/UserSlice";
import AdminOrders from "./pages/AdminOrders";
import AdminAdd from "./pages/AdminAdd";
import AdminMenu from "./pages/AdminMenu";
import  { Toaster } from 'react-hot-toast';




function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);


  useEffect(() => {
    logger();
  }, [user]);

  const logger = async () => {
    try {
      const response = await axios.get(`${URL}/getauth`,{
        withCredentials: true,
      });
      dispatch(setUser(response.data.success));
      dispatch(setRole(response.data.data.role));

 
    } catch (err) {
      
    }
  };

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Home />} />
      {<Route path="/myorders" element={<Order />} />}
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/add" element={<AdminAdd />} />
      <Route path="/admin" element={<AdminMenu />} />
    </Routes>
    </>
  );
}

export default App;
