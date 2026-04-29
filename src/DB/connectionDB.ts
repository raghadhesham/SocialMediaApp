import mongoose from "mongoose";
import { config } from "../config/config.services";
export const checkConnectionDb = async () => {
  try {
    await mongoose.connect(config.db.MONGODB_URI as string, {
      dbName:"SocialMediaApp"
    });    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  } 
};
