const mongoose = require('mongoose');
const Course = require('./models/Course')
const courseData = require('./data.json')


mongoose
  .connect(
    "mongodb+srv://chandra041628:chandra@backendapi.dhr7f.mongodb.net/LMS?retryWrites=true&w=majority&appName=backendAPI"
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    // Delete all existing records
    await Course.deleteMany({});
    console.log("Old data deleted.");

    // Bulk insert new data
    await Course.insertMany(courseData);
    console.log("New data imported successfully");

    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error importing data:", error);
  });
