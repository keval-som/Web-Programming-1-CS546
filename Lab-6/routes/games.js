// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
import * as games from "../data/games.js";

const router = Router();

router
  .route("/:teamId")
  .get(async (req, res) => {
    //code here for GET
    try {
      const team = await games.getAllGames(req.params.teamId);
      if (!team) {
        return res.status(404).json({ message: "Game not found!" });
      }
      res.status(200).json(team.games);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      const team = await games.createGame(req.body, req.params.teamId);
      if (!team) {
        return res.status(404).json({ message: "team not found!" });
      }
      res.status(200).json(team);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

router
  .route("/game/:gameId")
  .get(async (req, res) => {
    //code here for GET
    try {
      const game = await games.getGame(req.params.gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found!" });
      }
      let gameObj = game.games.find(
        (gameId) => gameId._id.toString() === req.params.gameId
      );
      res.status(200).json(gameObj);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  })
  .patch(async (req, res) => {
    //code for PATCH
    try {
      if (Object.keys(req.body).length < 1) {
        return res.status(400).json({ error: "Enter atleast 1 field" });
      }
      const game = await games.updateGame(req.params.gameId, req.body);
      if (!game) {
        return res.status(404).json({ message: "Game not found!" });
      }
      res.status(200).json(game);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const game = await games.removeGame(req.params.gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found!" });
      }
      res.status(200).json(game);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

export default router;
