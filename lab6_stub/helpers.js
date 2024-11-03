// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import { ObjectId } from "mongodb";

export const strCheck = (str, parameter) => {
  if (!str) {
    throw new Error(`${parameter} is not provided`);
  }
  if (typeof str !== "string") {
    throw new Error(`${parameter} is not a string`);
  }
  if (str.trim().length === 0) {
    throw new Error(`${parameter} is an empty string`);
  }
};

export const intCheck = (num, parameter) => {
  if (!num) {
    throw new Error(`${parameter} is not provided`);
  }
  if (typeof num !== "number") {
    throw new Error(`${parameter} is not a number`);
  }
};

export function isValidState(state) {
  const validStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  return state.length === 2 && validStates.includes(state.toUpperCase());
}

export const isValidId = (id) => {
  if (!id) throw new Error("You must provide an id to search for");
  if (typeof id !== "string") throw new Error("Id must be a string");
  if (id.trim().length === 0)
    throw new Error("Id cannot be an empty string or just spaces");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw new Error("invalid object ID");
};
