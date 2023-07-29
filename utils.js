import mongoose from "mongoose";

export const convertIdFromStringToMongoId = (inputId) => {
  const convertToMongoId = new mongoose.Types.ObjectId(inputId);
  return convertToMongoId;
};

export const checkIfInputIdIsValid = (inputId) => {
  const validId = mongoose.Types.ObjectId.isValid(inputId);
  return validId;
};
// const resultCheck = checkIfInputIdIsValid("1234");
// console.log(resultCheck);
