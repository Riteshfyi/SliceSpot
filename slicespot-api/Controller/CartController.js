const User = require("../Model/User");
const Pizza = require("../Model/Pizza");

exports.addToCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let cartData = user.cartData;

    const index = cartData.findIndex((item) => item.id === req.body.itemId);

    if (index === -1) {
      cartData.push({
        id: req.body.itemId,
        quantity: 1,
      });
    } else {
      cartData[index].quantity = cartData[index].quantity + 1;
    }

    await User.findByIdAndUpdate(req.user.id, { cartData });

    res.status(200).json({
      success: true,
      message: "Added to Cart",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Service Error",
    });

    console.log(err);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let cartData = user.cartData;

    const index = cartData.findIndex((item) => item.id === req.body.itemId);

    if (index < 0) {
      return res.status(409).json({
        success: false,
        message: "Item does not exist in cart",
      });
    } else {
      if (cartData[index].quantity > 1) {
        cartData[index].quantity = cartData[index].quantity - 1;
      } else {
        cartData = cartData.filter((item) => item.id !== req.body.itemId);
      }
    }

    await User.findByIdAndUpdate(req.user.id, { cartData });

    return res.status(200).json({
      success: true,
      message: "Removed from Cart",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Service Error",
    });

    console.log(err);
  }
};

    

exports.getCart = async (req, res) => {
  let cart = [];

  try {
    let user = await User.findOne({ _id: req.user.id });
    let cartData = user.cartData;
    let total = 0;
    for (let item of cartData) {
      try {
        let response = await Pizza.findOne({ _id: item.id });

        if (response) {
          response = response.toObject();
          response.quantity = item.quantity;
          total = total + response.quantity * response.price;
          response.price = response.price * response.quantity;
          cart.push(response);
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Internal Server Issue, Couldnt Fetch Cart",
        });
        return; // Exit the function after sending the error response
      }
    }

    res.status(200).json({
      success: true,
      data: cart,
      total,
      message: "cart fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Issue, Couldnt Fetch Cart",
    });
  }
};



