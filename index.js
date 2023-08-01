import express from "express";
import { db_connection } from "./db_connection.js";
import userRoute from "./user/user_route.js";
import { CURSOR_FLAGS } from "mongodb";

const port = 27010;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view-engine", "ejs");

app.use(userRoute);

// DB CONNECTION
db_connection();

app.get("/", (req, res) => {
  console.log(req.body.useremail);
  console.log(req.body.userpassword);
  res.render("login.ejs");
});

app.listen(port, () => {
  console.log(`SERVER IS LISTENING ON PORT ${port}`);
});
