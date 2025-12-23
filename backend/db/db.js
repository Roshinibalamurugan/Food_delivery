import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/food_delivery");
        console.log("DB connected");
    } catch (e) {
        console.error("Error connecting to DB: ", e.message);
    }
}

export default connectDB;  






