const express = require("express");
const router = require("../routes/router");
const cors = require("cors");
require("dotenv").config();
const cookies = require("cookie-parser");
const { cloudinaryConnect } = require("../config/cloudinary");
const fileupload = require("express-fileupload");
const app = express();
const dbConnect = require("../config/database");
const PORT = process.env.PORT || 3300;



app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});



const corsOptions = {
  origin: "http://localhost:3000",
  credentials:true
};

app.use(cors(corsOptions));




app.use(cookies());
app.use(fileupload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(express.json());
app.use(router);


dbConnect();

cloudinaryConnect();
