//Here you will require route files and export them as used in previous labs.
//Here you will import route files and export them as used in previous labs
import fiboRoute from "./fibonacci_prime.js";
const constructorMethod = (app) => {
  app.use("/", fiboRoute);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

export default constructorMethod;
