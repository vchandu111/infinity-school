const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("../backend/routes/auth-routes/index")
const mediaRoutes = require('./routes/instructor-routes/media-routes')
const instructorCourseRoutes = require('./routes/instructor-routes/course-routes')
const app = express();
const cors = require("cors");
// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(
  cors({
    origin: "http://localhost:3001", // Replace with your frontend's URL/port
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// API Routes
app.use("/auth", authRoutes);
app.use('/media',mediaRoutes)
app.use("/instructor/course", instructorCourseRoutes);


// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://chandra041628:chandra@backendapi.dhr7f.mongodb.net/LMS?retryWrites=true&w=majority&appName=backendAPI"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.error("Database connection failed:", error));
