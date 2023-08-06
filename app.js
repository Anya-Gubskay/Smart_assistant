const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");
const keys = require("./config/keys");
const app = express();

mongoose
  .connect(keys.mongoURL, { dbName: keys.dbName }, {useNewUrlParser: true})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// add passport strategy
app.use(passport.initialize());
require("./middleware/passport")(passport);

//to see what is happening with the server at the moment
app.use(require("morgan")("dev"));
//send images from a folder by url
app.use("/uploads", express.static("uploads"));
//to get req.body in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//to configure HTTP headers applicable with CORS (Cross-Origin Resource Sharing).
app.use(require("cors")());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", keys.API_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/position", positionRoutes);

module.exports = app;
