const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

// Importing Routes
const userRoutes = require("./routes/users.js");
const eventRoutes = require("./routes/event.js");
const accommodationRoutes = require("./routes/accommodation.js");
const reservationRoutes = require("./routes/reservation.js");

// Importing Model
// const User = require("./models/users.js");

// Define where the files get stored
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, newDate().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Register Molter
const multerUploads = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");

// Start the App
const app = express();

// Setup Middleware
app.use(cors());
app.use(express.json());

// Implement the Routes
app.get("/api/v1/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Students Support Rest Api!",
  });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/accommodations", accommodationRoutes);
app.use("/api/v1/reservations", reservationRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not recognized." });
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// Start the Server Application
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));
