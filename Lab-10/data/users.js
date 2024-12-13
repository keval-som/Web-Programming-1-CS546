//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import { strCheck, validatePassword } from "../helpers.js";
export const signUpUser = async (
  firstName,
  lastName,
  userId,
  password,
  confirmPassword,
  favoriteQuote,
  themePreference,
  role
) => {
  firstName = strCheck(firstName, "firstName");
  if (/\d/.test(firstName)) {
    throw new Error("firstName should not contain numbers");
  }
  if (firstName.length < 2 || firstName.length > 25) {
    throw new Error("firstName must be between 2 and 25 characters long");
  }

  lastName = strCheck(lastName, "lastName");
  if (/\d/.test(lastName)) {
    throw new Error("lastName should not contain numbers");
  }
  if (lastName.length < 2 || lastName.length > 25) {
    throw new Error("lastName must be between 2 and 25 characters long");
  }

  userId = strCheck(userId, "userId");
  if (/\d/.test(userId)) {
    throw new Error("userId should not contain numbers");
  }
  if (userId.length < 5 || userId.length > 10) {
    throw new Error("userId must be between 5 and 10 characters long");
  }
  userId = userId.toLowerCase();

  favoriteQuote = strCheck(favoriteQuote, "favoriteQuote");
  if (favoriteQuote.length < 20 || favoriteQuote.length > 255) {
    throw new Error("favoriteQuote must be between 20 and 255 characters long");
  }

  role = strCheck(role, "role");
  role = role.toLowerCase();
  if (role !== "admin" && role !== "user") {
    throw new Error("role must be either admin or user");
  }

  if (typeof themePreference !== "object" || themePreference === null) {
    throw new Error("themePreference must be an object");
  }

  const { backgroundColor, fontColor } = themePreference;

  if (
    !backgroundColor ||
    !fontColor ||
    Object.keys(themePreference).length !== 2
  ) {
    throw new Error("themePreference has incorrect keys");
  }

  const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

  if (!hexColorRegex.test(backgroundColor)) {
    throw new Error("backgroundColor must be a valid hex color code");
  }

  if (!hexColorRegex.test(fontColor)) {
    throw new Error("fontColor must be a valid hex color code");
  }

  if (backgroundColor.toLowerCase() === fontColor.toLowerCase()) {
    throw new Error("backgroundColor and fontColor cannot be the same");
  }

  password = strCheck(password, "password");
  validatePassword(password);
  if (password !== confirmPassword) {
    throw new Error("password and confirmPassword must match");
  }

  let userIdCount = 0;
  const userCollection = await users();
  try {
    userIdCount = await userCollection.count({ userId });
  } catch (e) {
    return { registrationCompleted: false };
  }
  if (userIdCount > 0) {
    throw new Error("userId already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    firstName,
    lastName,
    userId,
    password: hashedPassword,
    favoriteQuote,
    themePreference,
    role,
  };
  try {
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) {
      throw new Error("Could not add user");
    }
  } catch (e) {
    return { registrationCompleted: false };
  }

  return { registrationCompleted: true };
};

export const signInUser = async (userId, password) => {
  userId = strCheck(userId, "userId");
  userId = userId.toLowerCase();
  password = strCheck(password, "password");
  validatePassword(password);
  const userCollection = await users();
  let user;
  try {
    user = await userCollection.findOne({ userId });
  } catch (e) {
    return { signInCompleted: false };
  }
  if (!user) {
    throw new Error("Either the userId or password is invalid");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Either the userId or password is invalid");
  }
  return {
    signInCompleted: true,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    themePreference: user.themePreference,
    favoriteQuote: user.favoriteQuote,
    userId: user.userId,
  };
};
