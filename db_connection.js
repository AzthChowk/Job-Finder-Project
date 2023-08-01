import mongoose from "mongoose";

export const db_connection = async () => {
  try {
    await mongoose.connect(
      encodeURI(
        "mongodb+srv://xxxxxxxxxxx:xxxxxxxxxx@clusterlearn.zlemit3.mongodb.net/JobFinder?retryWrites=true&w=majority"
      )
    );
    console.log("DATABASE CONNECTION SUCCESSFUL.");
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED.");
    console.log(error.message);
  }
};
