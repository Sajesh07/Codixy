import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in environment variables");
      console.error(
        "Please set MONGO_URI in your .env file or environment variables"
      );
      process.exit(1);
    }

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("✅ Connected Successfully to MongoDB:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // 0 for success and 1 for failure
  }
};
