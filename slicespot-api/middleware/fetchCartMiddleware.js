const User = require("../Model/User");
const Pizza = require("../Model/Pizza");


exports.fetchCartMiddleware = async (req, res,next) => {
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
            total = total +  (response.quantity)*(response.price);
            response.price = response.price*response.quantity
            cart.push(response);
          }
        } catch (err) {
     
          res.status(500).json({
            success: false,
            message: "Internal Server Issue, Couldnt Fetch Cart",
          });
          return; 
        }
      }
        
     req.cart = cart;
     req.total = total

     try{
       
        await User.findByIdAndUpdate(req.user.id, { cartData:[{}]});   
         
       
     }catch(e){
       return res.status(500).json({
            success: false,
            message: "Internal Server Issue, Couldnt Cear Cart",
          });
     }

     next();

    } catch (err) {
      
      res.status(500).json({
        success: false,
        message: "Internal Server Issue, Couldnt Fetch Cart",
      });
    }
  };
