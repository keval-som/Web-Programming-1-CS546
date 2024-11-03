// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from "express";
const router = Router();
import * as teams from "../data/teams.js";
router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      const team = await teams.getAllTeams(req.params.teamId);
      if (!team || team.length === 0) {
        return res.status(404).json({ message: "No teams found" });
      }
      res.status(200).json(team);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      if (Object.keys(req.body).length > 8) {
        return res.status(400).json({ error: "Too many fields" });
      }
      const team = await teams.createTeam(req.body);
      if (!team) {
        return res.status(400).json({ error: "Team not created" });
      }
      res.status(200).json(team);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e.message });
    }
  });

router
  .route("/:teamId")
  .get(async (req, res) => {
    try {
      const team = await teams.getTeamById(req.params.teamId);
      if (!team) {
        return res.status(404).json({ message: "Team not found!" });
      }
      res.status(200).json(team);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      const deletedInfo = await teams.removeTeam(req.params.teamId);
      if (!deletedInfo) {
        return res.status(404).json({ message: "Team not found!" });
      }
      res.status(200).json({ _id: deletedInfo._id, deleted: true });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    try {
      if (Object.keys(req.body).length > 8) {
        return res.status(400).json({ error: "Too many fields" });
      }
      const team = await teams.updateTeam(req.body, req.params.teamId);
      if (!team) {
        return res.status(404).json({ message: "Team not found!" });
      }
      res.status(200).json(team);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

export default router;
