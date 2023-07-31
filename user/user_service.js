import bcrypt from "bcrypt";
import {
  checkIfInputIdIsValid
} from "../utils.js";
import { User } from "./user_model.js";
import { schema } from "./user_validation.js";
import jwt from "jsonwebtoken";

// JOI VALIDATION FOR THE NEW USER REGISTRATION DATA
export const checkValidation = async (req, res, next) => {
  try {
    const validateUserData = await schema.validateAsync();
    next();
  } catch (error) {
    console.log(error.message, "INVALID DATA");
    return res.status(400).send({ message: error.message });
  }
};
// CHECK WHETHER THE USER ALREADY EXIST OR NOT?
export const checkIfUserEmailExist = async (req, res, next) => {
  const newUser = req.body;
  const checkInputEmailExistence = await User.findOne({ email: newUser.email });
  if (checkInputEmailExistence) {
    console.log("USER ALREADY EXIST.");
    return res.status(400).send("USER ALREADY EXIST.");
  }
  next();
};
//CHANGE THE PLAIN PASSWORD TO HASHED PASSWORD TO STORE IN DATABASE
export const changeInputPasswordToHash = async (req, res, next) => {
  const newUser = req.body;
  const hashedPassword = await bcrypt.hash(newUser.password, 8);
  newUser.password = hashedPassword;
  console.log(hashedPassword);
  next();
};
//INSERT NEW USER AFTER VALIDATION
export const insertNewUserAfterValidation = async (req, res) => {
  const newUser = req.body;
  try {
    await User.create(newUser);
    return res.status(201).send("USER CREATED SUCCESSFULLY.");
  } catch (error) {
    console.log(error.message, "USER CREATION FAILED.");
    return res.status(400).send({ message: error.message });
  }
};

// GET ALL USERS - token authentication - payload verify 
export const allUsersList = async (req, res) => {
const authorizationHeader = req.headers.authorization;
console.log(authorizationHeader)
if(!authorizationHeader){
  return res.status(401).send("SOMETHNG WENT WRONG.")
}
const token = authorizationHeader.split(" ")[1];
// const token = tokenData[1];
// console.log(token);
try {
  const payload = jwt.verify(token, "jkdfkjndkjd")
  const user = await User.findOne({_id:payload._id});
  if (!user){
    return res.status(401).send("YOU ARE NOT AUTHORIZED TO USE THIS SERVICE.")
  }
  const usersList = await User.find({});
  return res.status(200).send(usersList);
} catch (error) {
  return res.status(401).send({message:"SOMETHING WENT WRONG."})
}
};

// GET SINGLE USER

export const idValidityCheck = async (req, res, next) => {
  const userId = req.params.id;
  const isMongoIdValid = checkIfInputIdIsValid(userId);
  if (!isMongoIdValid) {
    return res.status(400).send("ID IS NOT VALID.");
  }
  next();
};

// FIND SINGLE USER

export const findUserData = async (req, res) => {
  const userId = req.params.id;
  const userData = await User.findOne(
    {
      _id: userId,
    },
    { password: 0 }
  );
  if (!userData) {
    return res.status(404).send("DATA NOT FOUND.");
  }

  return res.status(200).send(userData);
};
