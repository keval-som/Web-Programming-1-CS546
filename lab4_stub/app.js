/*

Create a team of your choice.
Log the newly created team. (Just that team, not all teams)
Create another team of your choice.
Query all team, and log them all
Create the 3rd team of your choice.
Log the newly created 3rd team. (Just that team, not all team)
Move the first team
Log the first team with the updated info. 
Remove the second team you created.
Query all teams, and log them all
Try to create a team with bad input parameters to make sure it throws errors.
Try to remove a team that does not exist to make sure it throws errors.
Try to rename a team that does not exist to make sure it throws errors.
Try to rename a team passing in invalid data to make sure it throws errors.
Try getting a team by ID that /does not exist to make sure it throws errors.

*/

import * as teams from "./data/teams.js";

async function main() {
  try {
    var yankees = await teams.createTeam(
      "Yankees",
      "Baseball",
      1903,
      "New York",
      "ny",
      "Yankee Stadium",
      27,
      [
        { firstName: "DJ", lastName: "LeMahieu", position: "2B" },
        { firstName: "Aaron", lastName: "Judge", position: "RF" },
        { firstName: "Giancarlo", lastName: "Stanton", position: "DH" },
        { firstName: "Anthony", lastName: "Rizzo", position: "1B" },
        { firstName: "Gleyber", lastName: "Torres", position: "SS" },
        { firstName: "Harrison", lastName: "Bader", position: "CF" },
        { firstName: "Oswaldo", lastName: "Cabrera", position: "LF" },
        { firstName: "Isiah", lastName: "Kiner-Falefa", position: "3B" },
        { firstName: "Kyle", lastName: "Higashioka", position: "C" },
      ]
    );
    console.log(yankees);
  } catch (error) {
    console.log(error);
  }
  try {
    var mets = await teams.createTeam(
      "The Mets",
      "Baseball",
      1962,
      "Hoboken",
      "NJ",
      "Elysian Fields",
      2,
      [
        { firstName: "Brandon", lastName: "Nimmo", position: "CF" },
        { firstName: "Francisco", lastName: "Lindor", position: "SS" },
        { firstName: "Pete", lastName: "Alonso", position: "1B" },
        { firstName: "Jeff", lastName: "McNeil", position: "2B" },
        { firstName: "Starling", lastName: "Marte", position: "RF" },
        { firstName: "Mark", lastName: "Canha", position: "LF" },
        { firstName: "Brett", lastName: "Baty", position: "3B" },
        { firstName: "Daniel", lastName: "Vogelbach", position: "DH" },
        { firstName: "Francisco", lastName: "Álvarez", position: "C" },
      ]
    );
    console.log(mets);
  } catch (error) {
    console.log(error);
  }
  try {
    const allTeams = await teams.getAllTeams();
    console.log(allTeams);
  } catch (error) {
    console.log(error);
  }
  try {
    var Cleveland = await teams.createTeam(
      "Cleveland Guardians",
      "Baseball",
      1903,
      "Cleveland",
      "ny",
      "Cleveland Stadium",
      27,
      [
        { firstName: "DJ", lastName: "LeMahieu", position: "2B" },
        { firstName: "Aaron", lastName: "Judge", position: "RF" },
        { firstName: "Giancarlo", lastName: "Stanton", position: "DH" },
        { firstName: "Anthony", lastName: "Rizzo", position: "1B" },
        { firstName: "Gleyber", lastName: "Torres", position: "SS" },
        { firstName: "Harrison", lastName: "Bader", position: "CF" },
        { firstName: "Oswaldo", lastName: "Cabrera", position: "LF" },
        { firstName: "Isiah", lastName: "Kiner-Falefa", position: "3B" },
        { firstName: "Kyle", lastName: "Higashioka", position: "C" },
      ]
    );
    console.log(Cleveland);
  } catch (error) {
    console.log(error);
  }
  try {
    const getTeam = await teams.getTeamById(Cleveland._id.toString());
    console.log(getTeam);
  } catch (error) {
    console.log(error);
  }
  try {
    const updatedTeam = await teams.moveTeam(
      yankees._id,
      "Bronx",
      "ny",
      "Bronx Stadium"
    );
    console.log(updatedTeam);
  } catch (error) {
    console.log(error);
  }
  try {
    const removeTeam = await teams.removeTeam(mets._id);
    console.log(removeTeam);
  } catch (error) {
    console.log(error);
  }

  try {
    const allTeams = await teams.getAllTeams();
    console.log(allTeams);
  } catch (error) {
    console.log(error);
  }

  try {
    const brooks = await teams.createTeam(
      "Brooks",
      "Baseball",
      1978,
      "Brooklyn",
      "NY",
      "Brooklyn Stadium",
      27,
      [
        { firstName: "ABC", lastName: 123, position: "2B" },
        { firstName: "Aaron", lastName: "Judge", position: "RF" },
        { firstName: "Giancarlo", lastName: "Stanton", position: "DH" },
        { firstName: "Anthony", lastName: "Rizzo", position: "1B" },
        { firstName: "Gleyber", lastName: "Torres", position: "SS" },
        { firstName: "Harrison", lastName: "Bader", position: "CF" },
        { firstName: "Oswaldo", lastName: "Cabrera", position: "LF" },
        { firstName: "Isiah", lastName: "Kiner-Falefa", position: "3B" },
        { firstName: "Kyle", lastName: "Higashioka", position: "C" },
      ]
    );
    console.log(brooks);
  } catch (error) {
    console.log(error);
  }

  try {
    const removeTeam = await teams.removeTeam("523iujjf807ey54");
    console.log(removeTeam);
  } catch (error) {
    console.log(error);
  }

  try {
    const updatedTeam = await teams.moveTeam(
      "507f1f77bcf86cd799439012",
      "Boston",
      "MA",
      "Boston Stadium"
    );
    console.log(updatedTeam);
  } catch (error) {
    console.log(error);
  }

  try {
    const updatedTeam = await teams.moveTeam(
      Cleveland._id,
      "Boston",
      "MAS",
      "Boston Stadium"
    );
    console.log(updatedTeam);
  } catch (error) {
    console.log(error);
  }

  try {
    const getTeam = await teams.getTeamById(mets._id);
    console.log(getTeam);
  } catch (error) {
    console.log(error);
  }
}

main();
