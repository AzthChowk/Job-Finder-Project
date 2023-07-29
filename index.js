import express from "express";
import { db_connection } from "./db_connection.js";
import userRoute from "./user/user_route.js";

const app = express();
app.use(express.json());
app.use(userRoute);

// DB CONNECTION
db_connection();

const port = 27010;

app.listen(port, () => {
  console.log(`SERVER IS LISTENING ON PORT ${port}`);
});
