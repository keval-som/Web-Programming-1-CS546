// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /teams use the routes defined in the teams.js routing file
    - When the route is /games use the routes defined in games.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/
import teams from "./teams.js";
import games from "./games.js";

const constructorMethod = (app) => {
  app.use("/teams", teams);
  app.use("/games", games);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};
export default constructorMethod;
