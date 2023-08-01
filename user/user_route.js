import express from "express";
import ejs from "ejs";

import {
  allUsersList,
  changeInputPasswordToHash,
  checkIfUserEmailExist,
  checkValidation,
  findUserData,
  idValidityCheck,
  insertNewUserAfterValidation,
  loginCredentialsCheck,
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

router.get("/login", loginCredentialsCheck);

export default router;
