import React from 'react'
import Navbar from "../components/Navbar"
import Header from "../components/Header";
import Menu from "../components/Menu"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function Home() {
  const user = useSelector((state) => state.app.user);
  

  return (
    <div>
        <Navbar/>
        <Header/>
        <Menu/> 
    </div>
  )
}

export default Home