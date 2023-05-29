const path = require("path");
const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
require("dotenv").config();

// Importing Routes
const userRoutes = require("./routes/users.js");
const eventRoutes = require("./routes/event.js");
// const accommodationRoutes = require("./routes/accommodation.js");
// const reservationRoutes = require("./routes/reservation.js");

// Importing Model
// const User = require("./models/users.js");

// Start the App
const app = express();

// Setup Middleware
app.use(cors());
app.use(express.json());

// Connecting to Mongo
/*
mongoose
  .connect("mongodb+srv://40210260:R56b6536I@cluster0.u9z6ifo.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then()
*/

// mongoose.connect();



// const db = mongoose.connection;
// db.on("error", (err) => console.log(error));
// db.once("open", () => console.log("Connected to the Database"));

// Implement the Routes
app.get("/api/v1/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Students Support Rest Api!",
  });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventRoutes);
// app.use("/api/v1/accommodations", accommodationRoutes);
// app.use("/api/v1/reservations", reservationRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not recognized." });
});

// Start the Server Application
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));
