// This data file should export all functions using the ES6 standard as shown in the lecture code
import { strCheck, intCheck, isValidState, isValidId } from "../helpers.js";
import { teams } from "../config/mongoCollections.js";
import { ObjectId, ReturnDocument } from "mongodb";

export const createTeam = async ({
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players,
}) => {
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

  let winLossCount = "0-0";
  let games = [];

  let team = {
    name: name,
    sport: sport,
    yearFounded: yearFounded,
    city: city,
    state: state,
    stadium: stadium,
    championshipsWon: championshipsWon,
    players: players,
    winLossCount: winLossCount,
    games: games,
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
    let team = await teamCollection.find({}).project({ name: 1 }).toArray();
    if (!team) return team;
    team.forEach((team) => {
      team._id = team._id.toString();
    });
    return team;
  } catch (error) {
    throw new Error(`Unable to retrieve teams`);
  }
};

export const getTeamById = async (id) => {
  isValidId(id);
  id = id.trim();
  let teamCollection = await teams();
  let team = await teamCollection.findOne({ _id: new ObjectId(id) });
  if (!team) return team;
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
  return deletedInfo;
};

export const updateTeam = async (
  { name, sport, yearFounded, city, state, stadium, championshipsWon, players },
  id
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
  isValidId(id);
  id = id.trim();

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
  let updateInfo = await teamCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: team },
    { returnDocument: "after", projection: { winLossCount: 0, games: 0 } }
  );
  return updateInfo;
};
