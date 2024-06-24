const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validater = require("email-validator");
require("dotenv").config();

//login cookie's name is UserToken

exports.signup = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  if (!validater.validate(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  if (password.length < 4) {
    return res.status(411).json({
      success: false,
      message: "password should be atleast 4 characters",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User Already Exists",
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error in hashing password : ${err}`,
    });
  }

  try {
    let user = await User.create({ name, password: hashedPassword, email });

    return res.status(200).json({
      success: true,
      message: "Registration Successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error in registering : ${err}`,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(409).json({
      success: false,
      message: "User does not exist",
    });
  }

  //lets verify

  const payload = {
    email: user.email,
    id: user._id,
    role: user.role,
  };

  const verified = await bcrypt.compare(password, user.password);
  if (verified) {
    const payload = {
      email: user.email,
      role: user.role,
      id: user._id,
    };

    try {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = undefined;
      user.id = user._id;
      user._id = undefined;
      user.password = undefined;
      user.name = undefined;

      const options = {
        expires: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
         sameSite: 'None'
      };

      // res.cookie("token", token, options)const options = {
// expires:new Date(
//   Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // calucate in milisec
//   ),
//   secure: true,//use this when the code is in production for https cookie request
//   httpOnly:true,
//   sameSite: 'None',//dealing with cross-site requests and the usage of third-party cookies
//   };

      res.cookie("token", token, options).status(200).json({
        success: true,
        data: user,
        message: "logged in successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Error in logging in : ${err}`,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Email or Password does not match",
    });
  }
};

exports.getAuth = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token missing",
      });
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      res.status(200).json({
        success: true,
        data: decode,
        message: "user verified",
      });
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};



exports.logout = async (req, res) => {
  try {
    // res.cookie("token", "", { expires: new Date(0), path: "/" });
      // res.cookie("token" , { expires: new Date(0), path: "/" });
        res.cookie.delete("token");

    res.status(200).json({
      success: true,
      message: "logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong while deleting cookie",
    });
  }
};
