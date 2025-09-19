import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://2300033445cseh1_db_user:Test1234@cluster0.29jcxse.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); 
  }
};

export { connectDB }; 
