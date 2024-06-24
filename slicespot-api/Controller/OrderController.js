const Order = require("../Model/Order");
const User = require("../Model/User");

exports.createOrder = async (req, res) => {
  const userId = req.user.id;

  const { address, no } = req.body;
  const items = req.cart;
  const amount = req.total;

  if (!address || !no) {
    return res.status(401).json({
      success: false,
      message: "Address or Contact Number is missing",
    });
  }

  if (!items) {
    return res.status(401).json({
      success: false,
      message: "Cart is Empty",
    });
  }

  try {
    const response = await Order.create({ amount, userId, items, address, no });

    res.status(200).json({
      success: true,
      data: response,
      message: "Successfully sent Order",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal Service Error , Couldnt send Order",
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const response = await Order.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      data: response,
      message: "Successfully fetched Orders",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Service Error , Couldnt fetch Order",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const response = await Order.find({});

    res.status(200).json({
      success: true,
      data: response,
      message: "Successfully fetched Orders",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Service Error , Couldnt fetch Order",
    });
  }
};

exports.updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const response = await Order.findByIdAndUpdate(orderId, { status: status });

    res.status(200).json({
      success: true,
      message: "Successfully Updated Order",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal Service Error , Couldnt Update",
    });
  }
};
