// TODO: Export and implement the following functions in ES6 format

import { ObjectId } from "mongodb";
import { teams } from "../config/mongoCollections.js";

const strCheck = (str, parameter) => {
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

const intCheck = (num, parameter) => {
  if (!num) {
    throw new Error(`${parameter} is not provided`);
  }
  if (typeof num !== "number") {
    throw new Error(`${parameter} is not a number`);
  }
};

function isValidState(state) {
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

const isValidId = (id) => {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "invalid object ID";
};

export const createTeam = async (
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {
  strCheck(name, "name");
  name = name.trim();
  strCheck(sport, "sport");
  sport = sport.trim();
  intCheck(yearFounded, "yearFounded");
  const currentYear = new Date().getFullYear();
  if (
    yearFounded < 1850 ||
    yearFounded > currentYear ||
    !Number.isInteger(yearFounded)
  ) {
    throw new Error(`${yearFounded} is not a valid year`);
  }

  strCheck(city, "city");
  city = city.trim();
  strCheck(state, "state");
  state = state.trim().toUpperCase();
  if (!isValidState(state)) {
    throw new Error(`${state} is not a valid state`);
  }
  strCheck(stadium, "stadium");
  stadium = stadium.trim();
  intCheck(championshipsWon, "championshipsWon");
  if (championshipsWon < 0 || !Number.isInteger(championshipsWon)) {
    throw new Error(
      `championshipsWon is not a valid number of championships won`
    );
  }

  if (!players || !Array.isArray(players)) {
    throw new Error(`players is not an array`);
  }
  if (players.length < 1) {
    throw new Error(`players is an empty array`);
  }
  players.forEach((player) => {
    strCheck(player.firstName, "players firstName");
    player.firstName = player.firstName.trim();
    strCheck(player.lastName, "players lastName");
    player.lastName = player.lastName.trim();
    strCheck(player.position, "players position");
    player.position = player.position.trim();
  });

  let team = {
    name: name,
    sport: sport,
    yearFounded: yearFounded,
    city: city,
    state: state,
    stadium: stadium,
    championshipsWon: championshipsWon,
    players: players,
  };

  let teamCollection = await teams();
  let insertInfo = await teamCollection.insertOne(team);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw new Error("Could not add team");

  const newId = insertInfo.insertedId.toString();

  const teamObj = await getTeamById(newId);
  return teamObj;
};

export const getAllTeams = async () => {
  try {
    let teamCollection = await teams();
    let team = await teamCollection.find({}).toArray();
    if (!team) return team;
    team.forEach((team) => {
      team._id = team._id.toString();
    });
    return team;
  } catch (error) {
    throw `Unable to retrieve teams`;
  }
};

export const getTeamById = async (id) => {
  isValidId(id);
  id = id.trim();
  let teamCollection = await teams();
  let team = await teamCollection.findOne({ _id: new ObjectId(id) });
  if (team === null) throw "No team with that id";
  team._id = team._id.toString();
  return team;
};

export const removeTeam = async (id) => {
  isValidId(id);
  id = id.trim();
  let teamCollection = await teams();
  let deletedInfo = await teamCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (!deletedInfo) {
    throw "Unable to delete team";
  }
  return `${deletedInfo.name} have been successfully deleted!`;
};

export const moveTeam = async (id, newCity, newState, newStadium) => {
  isValidId(id);
  id = id.trim();
  strCheck(newCity, "newCity");
  newCity = newCity.trim();
  strCheck(newState, "newState");
  newState = newState.trim().toUpperCase();
  if (!isValidState(newState)) {
    throw new Error(`${newState} is not a valid state`);
  }
  strCheck(newStadium, "newStadium");
  newStadium = newStadium.trim();

  let teamCollection = await teams();
  let updatedTeam = {
    city: newCity,
    state: newState,
    stadium: newStadium,
  };
  let updatedInfo = await teamCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedTeam },
    { returnDocument: "after" }
  );
  if (!updatedInfo) throw "Could not update team";
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};
