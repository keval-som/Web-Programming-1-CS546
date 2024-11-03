// This data file should export all functions using the ES6 standard as shown in the lecture code
import { strCheck, intCheck, isValidState, isValidId } from "../helpers.js";
import { teams } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import moment from "moment";

export const createGame = async (
  { gameDate, opposingTeamId, homeOrAway, finalScore, win },
  teamId
) => {
  isValidId(teamId);
  teamId = teamId.trim();
  isValidId(opposingTeamId);
  opposingTeamId = opposingTeamId.trim();
  strCheck(homeOrAway);
  homeOrAway = homeOrAway.trim();
  if (homeOrAway !== "Home" && homeOrAway !== "Away") {
    throw new Error("homeOrAway must be either home or away");
  }
  strCheck(finalScore);
  finalScore = finalScore.trim();
  const scorePattern = /^\d+-\d+$/;
  if (!scorePattern.test(finalScore)) {
    throw new Error("finalScore is invalid");
  }
  const [teamScore, opposingScore] = finalScore.split("-").map(Number);
  if (teamScore === opposingScore) {
    throw new Error("The score should not be tied");
  }
  if (typeof win !== "boolean") {
    throw new Error("win must be a boolean");
  }

  strCheck(gameDate);
  gameDate = gameDate.trim();
  if (!moment(gameDate, "MM/DD/YYYY", true).isValid()) {
    throw new Error("gameDate must be a valid date in the format mm/dd/yyyy");
  }
  const currentDate = moment();
  const gameMoment = moment(gameDate, "MM/DD/YYYY");
  if (gameMoment.isAfter(currentDate)) {
    throw new Error("gameDate cannot be in the future");
  }
  const teamCollection = await teams();
  const team = await teamCollection.findOne({ _id: new ObjectId(teamId) });
  if (!team) {
    return team;
  }
  const opposingTeam = await teamCollection.findOne({
    _id: new ObjectId(opposingTeamId),
  });
  if (!opposingTeam) {
    throw new Error(`Opposing team with id ${opposingTeamId} not found`);
  }

  if (team.sport !== opposingTeam.sport) {
    throw new Error("The two teams must be in the same sport");
  }

  let [winC, lossC] = team.winLossCount.split("-").map(Number);
  if (win) {
    winC++;
  } else {
    lossC++;
  }
  const winLossCount = `${winC}-${lossC}`;

  team.winLossCount = winLossCount;

  const newGame = {
    _id: new ObjectId(),
    gameDate,
    opposingTeamId: new ObjectId(opposingTeamId),
    homeOrAway,
    finalScore,
    win,
  };

  team.games.push(newGame);

  const updatedInfo = await teamCollection.findOneAndUpdate(
    { _id: new ObjectId(teamId) },
    { $set: team },
    { returnDocument: "after" }
  );

  return updatedInfo;
};

export const getAllGames = async (teamId) => {
  isValidId(teamId);
  teamId = teamId.trim();
  const teamCollection = await teams();
  const game = teamCollection.findOne({ _id: new ObjectId(teamId) });
  return game;
};

export const getGame = async (gameId) => {
  isValidId(gameId);
  gameId = gameId.trim();
  const teamCollection = await teams();
  const game = teamCollection.findOne(
    { "games._id": new ObjectId(gameId) },
    { projection: { games: 1, _id: 0 } }
  );
  return game;
};

export const updateGame = async (gameId, updateObject) => {
  isValidId(gameId);
  gameId = gameId.trim();
  const teamCollection = await teams();
  const team = await teamCollection.findOne({
    "games._id": new ObjectId(gameId),
  });
  if (!team) {
    return team;
  }
  let gameObj = team.games.find((game) => game._id.toString() === gameId);

  if (updateObject.hasOwnProperty("gameDate")) {
    strCheck(updateObject.gameDate, "gameDate");
    updateObject.gameDate = updateObject.gameDate.trim();
    if (!moment(updateObject.gameDate, "MM/DD/YYYY", true).isValid()) {
      throw new Error("gameDate must be a valid date in the format mm/dd/yyyy");
    }
    const currentDate = moment();
    const gameMoment = moment(updateObject.gameDate, "MM/DD/YYYY");
    if (gameMoment.isAfter(currentDate)) {
      throw new Error("gameDate cannot be in the future");
    }
    gameObj.gameDate = updateObject.gameDate;
  }

  if (updateObject.hasOwnProperty("opposingTeamId")) {
    isValidId(updateObject.opposingTeamId);
    updateObject.opposingTeamId = updateObject.opposingTeamId.trim();
    const opposingTeam = await teamCollection.findOne({
      _id: new ObjectId(updateObject.opposingTeamId),
    });
    if (!opposingTeam) {
      throw new Error(
        `Opposing team with id ${updateObject.opposingTeamId} not found`
      );
    }
    if (team.sport !== opposingTeam.sport) {
      throw new Error("The two teams must be in the same sport");
    }
    gameObj.opposingTeamId = new ObjectId(updateObject.opposingTeamId);
  }

  if (updateObject.hasOwnProperty("homeOrAway")) {
    strCheck(updateObject.homeOrAway);
    updateObject.homeOrAway = updateObject.homeOrAway.trim();
    if (
      updateObject.homeOrAway !== "Home" &&
      updateObject.homeOrAway !== "Away"
    ) {
      throw new Error("homeOrAway must be either home or away");
    }
    gameObj.homeOrAway = updateObject.homeOrAway;
  }

  if (updateObject.hasOwnProperty("finalScore")) {
    strCheck(updateObject.finalScore, "finalscore");
    updateObject.finalScore = updateObject.finalScore.trim();
    const scorePattern = /^\d+-\d+$/;
    if (!scorePattern.test(updateObject.finalScore)) {
      throw new Error("finalScore is invalid");
    }
    const [teamScore, opposingScore] = updateObject.finalScore
      .split("-")
      .map(Number);
    if (teamScore === opposingScore) {
      throw new Error("The score should not be tied");
    }
    gameObj.finalScore = updateObject.finalScore;
  }

  if (typeof updateObject.win === "boolean") {
    if (gameObj.win !== updateObject.win) {
      let [winC, lossC] = team.winLossCount.split("-").map(Number);
      if (updateObject.win) {
        winC++;
        lossC--;
      } else {
        winC--;
        lossC++;
      }
      team.winLossCount = `${winC}-${lossC}`;
    }
    gameObj.win = updateObject.win;
  }

  const gameIndex = team.games.findIndex(
    (game) => game._id.toString() === gameId
  );
  if (gameIndex === -1) {
    throw new Error("Game not found");
  }
  team.games[gameIndex] = gameObj;

  const updatedInfo = await teamCollection.findOneAndUpdate(
    { "games._id": new ObjectId(gameId) },
    { $set: team },
    { returnDocument: "after" }
  );

  return updatedInfo;
};

export const removeGame = async (gameId) => {
  isValidId(gameId);
  gameId = gameId.trim();
  const teamCollection = await teams();
  const team = await teamCollection.findOne({
    "games._id": new ObjectId(gameId),
  });
  if (!team) {
    return team;
  }
  const game = team.games.find((game) => game._id.toString() === gameId);
  let [winC, lossC] = team.winLossCount.split("-").map(Number);
  if (team.winLossCount) {
    winC--;
  } else {
    lossC--;
  }
  team.winLossCount = `${winC}-${lossC}`;
  const updatedGames = team.games.filter(
    (game) => game._id.toString() !== gameId
  );
  team.games = updatedGames;
  const updateGame = await teamCollection.findOneAndUpdate(
    { _id: new ObjectId(team._id) },
    { $set: team },
    { returnDocument: "after" }
  );
  return updateGame;
};
