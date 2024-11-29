const express = require("express");
const jobController = require("../controllers/jobController");

const router = express.Router();

// Define job-related routes
router.get("/", (req, res) => {
  res.send("Hello from Node API");
});

router.get("/jobs", jobController.getAllJobs);

module.exports = router;
