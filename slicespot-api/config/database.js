const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(()=>{console.log("connected to database")})
  .catch((err)=>{console.log("couldnt connect to database" , err)});

};

module.exports = dbConnect;
