const cloudinary = require("cloudinary").v2;

require("dotenv").config();

exports.uploadImg = async (req, res, next) => {
  try {
    const img = req.files.image;

    const folder = "slicespot";
    const options = { folder };

    const response = await cloudinary.uploader.upload(
      img.tempFilePath,
      options
    );

    req.body.image = response.secure_url;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Service Error : Couldnt Upload Image",
    });
  }
};
