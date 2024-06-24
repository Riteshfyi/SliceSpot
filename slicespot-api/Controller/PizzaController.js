const Pizza = require("../Model/Pizza");

exports.getPizza = async (req, res) => {
  try {
    const response = await Pizza.find({});

    res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "menu fetched successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal service error , couldn't fetch menu",
    });
  }
};

exports.createPizza = async (req, res) => {
  const { name, size, price, image } = req.body;

  try {
    await Pizza.create({ name, size, price, image });

  
    res.status(200).json({
      success: true,
      message: "Menu Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal service error , couldn't update menu",
    });
  }
};

exports.deletePizza = async (req,res) => {
    try{

      const id = req.params.id;
       
       const response = await Pizza.findByIdAndDelete(id);
 
      res.status(200).json({
        success:true,
        message:"Item Deleted Successfully"
      })
        

    }catch(err){
      res.status(500).json({
        success: false,
        message: "internal service error , couldn't delete Item",
      });
      
    }

   
}