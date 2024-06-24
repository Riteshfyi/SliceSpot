const express = require("express");
const {
  getPizza,
  createPizza,
  deletePizza,
} = require("../Controller/PizzaController");
const { login, signup, getAuth, logout } = require("../Controller/Auth");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../Controller/CartController");
const { createOrder, getOrders,getAllOrders , updateStatus } = require("../Controller/OrderController");
const {fetchCartMiddleware} = require("../middleware/fetchCartMiddleware");
const { auth, isAdmin } = require("../middleware/auth");
const { uploadImg } = require("../middleware/uploadImg");


const router = express.Router();

router.get("/getmenu", getPizza);
router.post("/login", login);
router.post("/signup", signup);
router.get("/getauth", getAuth);
router.get("/logout", logout);

router.post("/add", auth, addToCart);
router.post("/remove", auth, removeFromCart);
router.post("/getcart", auth, getCart);

router.post("/create", auth, isAdmin, uploadImg, createPizza);
router.delete("/delete/:id", auth, isAdmin, deletePizza);

router.get("/getorders", auth, getOrders);
router.post("/createorder", auth,fetchCartMiddleware ,createOrder);

router.get("/getallorders", auth,isAdmin , getAllOrders);
router.post("/updatestatus" , auth , isAdmin , updateStatus);



module.exports = router;
