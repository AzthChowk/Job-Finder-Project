import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./user_model.js";
import jwt from "jsonwebtoken";
import {
  convertIdFromStringToMongoId,
  checkIfInputIdIsValid,
} from "../utils.js";

import {
  checkValidation,
  checkIfUserEmailExist,
  changeInputPasswordToHash,
  insertNewUserAfterValidation,
  allUsersList,
  idValidityCheck,
  findUserData,
} from "./user_service.js";

const router = express.Router();

//CREATE NEW USER
router.post(
  "/user/create",
  checkValidation,
  checkIfUserEmailExist,
  changeInputPasswordToHash,
  insertNewUserAfterValidation
);

// GET ALL THE USERS
router.get("/users", allUsersList);

// GET SINGLE USER
router.get("/user/:id", idValidityCheck, findUserData);

// LOGIN

router.get("/login", async (req, res) => {
  const loginCredentials = req.body;
  console.log(loginCredentials);
  const findUser = await User.findOne({
    email: loginCredentials.email,
  });
  if (!findUser) {
    return res.status(404).send("INVALID CREDENTIALS, LOGIN FAILED.");
  }
  const matchPassword = await bcrypt.compare(
    loginCredentials.password,
    findUser.password
  );
  if (!matchPassword) {
    return res.status(409).send("INVALID CREDENTIALS, LOGIN FAILED.");
  }
  const accessToken = jwt.sign({ _id: findUser._id }, "jkdfkjndkjd", {
    expiresIn: "1d",
  });
  console.log(accessToken);
  return res.status(200).send(`HELLO ${findUser.name}, You are logged in.`);
});
export default router;
