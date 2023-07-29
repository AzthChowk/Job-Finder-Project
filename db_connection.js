import mongoose from "mongoose";

export const db_connection = async () => {
  try {
    await mongoose.connect(
      encodeURI(
        "mongodb+srv://Sambudhapp:sambudha@clusterlearn.zlemit3.mongodb.net/JobFinder?retryWrites=true&w=majority"
      )
    );
    console.log("DATABASE CONNECTION SUCCESSFUL.");
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED.");
    console.log(error.message);
  }
};
