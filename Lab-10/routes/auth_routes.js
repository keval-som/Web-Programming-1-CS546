//import express, express router as shown in lecture code
import express from "express";
const router = express.Router();
import { signUpUser, signInUser } from "../data/users.js";

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/signupuser")
  .get(async (req, res) => {
    //code here for GET
    if (req.session && req.session.user) {
      if (req.session.user.role === "admin") {
        return res.redirect("/administrator");
      } else if (req.session.user.role === "user") {
        return res.redirect("/user");
      }
    }
    return res.status(200).render("signupUser");
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let response = await signUpUser(
        req.body.firstName,
        req.body.lastName,
        req.body.userId,
        req.body.password,
        req.body.confirmPassword,
        req.body.favoriteQuote,
        req.body.themePreference,
        req.body.role
      );
      if (response.registrationCompleted) {
        return res.redirect("/signinuser");
      } else {
        return res
          .status(500)
          .render("signupUser", { error: "Internal Server Error" });
      }
    } catch (e) {
      return res.status(400).render("signupuser", { error: e.message });
    }
  });

router
  .route("/signinuser")
  .get(async (req, res) => {
    //code here for GET
    return res.status(200).render("signinUser");
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let response = await signInUser(req.body.userId, req.body.password);
      if (response.signInCompleted) {
        req.session.user = {
          userId: response.userId,
          role: response.role,
          firstName: response.firstName,
          lastName: response.lastName,
          favoriteQuote: response.favoriteQuote,
          themePreference: response.themePreference,
        };
        if (response.role === "admin") {
          return res.redirect("/administrator");
        }
        return res.redirect("/user");
      } else {
        return res.status(500).render("signinUser", {
          error: "Internal Server Error",
        });
      }
    } catch (e) {
      return res.status(400).render("signinUser", { error: e.message });
    }
  });

router.route("/user").get(async (req, res) => {
  //code here for GET
  const isAdmin = req.session.user.role === "admin";
  return res.status(200).render("user", {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    favoriteQuote: req.session.user.favoriteQuote,
    themePreference: req.session.user.themePreference,
    role: req.session.user.role,
    currentTime: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString(),
    isAdmin,
  });
});

router.route("/administrator").get(async (req, res) => {
  //code here for GET
  return res.status(200).render("administrator", {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    favoriteQuote: req.session.user.favoriteQuote,
    themePreference: req.session.user.themePreference,
    role: req.session.user.role,
    currentTime: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString(),
  });
});

router.route("/signoutuser").get(async (req, res) => {
  //code here for GET
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Unable to log out");
    }
    res.status(200).render("signoutUser");
  });
});

export default router;
