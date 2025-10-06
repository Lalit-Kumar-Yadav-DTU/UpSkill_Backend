const mongoose = require("mongoose");

// Import your models
const Category = require("./models/category"); // adjust path
const Course = require("./models/course");

const MONGO_URL = "mongodb+srv://lalitkumaryadav14112003:Lalit%40123@cluster0.vo8xv4g.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0"; // put your MongoDB URL

async function testCategoryCourses() {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected ✅");

    // Fetch a category and populate courses
    const categoryName = "development"; // change to your catalogName
    const category = await Category.findOne({ name: categoryName }).populate("courses");

    if (!category) {
      console.log("Category not found!");
      return;
    }

    console.log("Category Found:", category.name);
    console.log("Courses in this category:");

    category.courses.forEach((course, i) => {
      console.log(`${i + 1}. ${course.courseName} - Status: ${course.status}`);
    });

    mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

testCategoryCourses();
