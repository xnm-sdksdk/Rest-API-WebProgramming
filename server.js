const path = require("path");
const express = require("express");
const cors = require("cors");

// Importing Routes
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const accommodationRoutes = require("./routes/accommodation");
const reservationRoutes = require("./routes/reservation");
const authRoutes = require("./routes/auth");

// Importing Model
const User = require("./models/users");

// Start the App
const app = express();

// Setup Middleware
app.use(cors());
app.use(express.json());

// Connecting to Mongo
mongoose.connect("").the((result) => {
  User.findOne().then((user) => {
    if (!user) {
      const user = new User({
        name: "NM",
        email: "40210260@esmad.ipp.pt",
        accommodations: {
          accommodation: [],
        },
        events: {
            event: [],
        },
        reservations: {
            reservation: [],
        },

      });
    }
  });
});

// Implement the Routes
app.use("/api/v1/users");
app.use("/api/v1/events");
app.use("/api/v1/accommodations");
app.use("/api/v1/reservations");
app.use("/api/v1/auth");

// Start the Server Application
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1"
app.listen(port, () => console.log(`http://${HOST}:${PORT}`));
