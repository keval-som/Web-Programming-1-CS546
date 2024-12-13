// Setup server, session and middleware here.

/*
You will have the following middleware functions:

This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following:
This middleware will log to your console for every request made to the server, with the following information:
Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Route: req.originalUrl
Some string/boolean stating if a user is authenticated
If logged in, the users status (administrator or user)
    There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

     An example would be:

    [Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated)

     [Sun, 14 Apr 2019 23:56:14 GMT]: POST /signin (Non-Authenticated)

     [Sun, 14 Apr 2019 23:56:19 GMT]: GET /userProfile (Authenticated Administrator User)

     [Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)

2. After you log the request info in step A,  if the request path is the root "/" and the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /administrator route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will redirect them to the GET /signinuser route. If the path is not the root, then call next.

3. This middleware will only be used for the GET /signinuser route and will do one of the following:    
     A. If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /administrator route,
     B. If the user is authenticated AND they have a role of user, you will redirect them to the /user route.
     C. If the user is NOT authenticated, you will allow them to get through to the GET /signinuser route. A logged in user should never be able to access the sign in form.

4. This middleware will only be used for the GET /signupuser route and will do one of the following:
     A. If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /administrator route,
     B. If the user is authenticated AND they have a role of user, you will redirect them to the /user route.
     C. If the user is NOT authenticated, you will allow them to get through to the GET /signupuser route. A logged in user should never be able to access the registration form.

5. This middleware will only be used for the GET /user route and will do one of the following:
     A. If a user is not logged in, you will redirect to the GET /signinuser route.
     B. If the user is logged in, the middleware will "fall through" to the next route calling the next() callback. (Users with both roles administrator or user should be able to access the /user route, so you simply need to make sure they are authenticated in this middleware.)

6. This middleware will only be used for the GET /administrator route and will do one of the following: 
    A. If a user is not logged in, you will redirect to the GET /signinuser route.
    B. If a user is logged in, but they are not an administrator user, you end the response right in the middleware function and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403. (provide a link to the /user page, since they are logged in, just not an admin)
   C. If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
 ONLY USERS WITH A ROLE of administratorSHOULD BE ABLE TO ACCESS THE /administrator ROUTE!

7. This middleware will only be used for the GET /signoutuser route and will do one of the following:   
     A. If a user is not logged in, you will redirect to the GET /signinuser route.
     B. If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

*/

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import exphbs from "express-handlebars";
import constructorMethod from "./routes/index.js";
const app = express();

app.use(
  session({
    name: "AuthenticationState",
    secret: "SecretCookie",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use((req, res, next) => {
  let s = "Non-Authenticated";
  if (req.session && req.session.user) {
    s = "Authenticated User";
    if (req.session.user.role === "admin") {
      s = "Authenticated Administrator User";
    }
  }
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${s})`
  );

  if (req.path === "/") {
    if (req.session && req.session.user) {
      if (req.session.user.role === "admin") {
        return res.redirect("/administrator");
      } else {
        return res.redirect("/user");
      }
    } else {
      return res.redirect("/signinuser");
    }
  } else {
    next();
  }
});

app.use("/signinuser", (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/administrator");
    } else {
      return res.redirect("/user");
    }
  } else {
    next();
  }
});

app.use("/signupuser", (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/administrator");
    } else {
      return res.redirect("/user");
    }
  } else {
    next();
  }
});

app.use("/user", (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.redirect("/signinuser");
  }
});

app.use("/administrator", (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user.role === "admin") {
      next();
    } else {
      return res.status(403).render("error", {
        error: "You do not have permission to view this page.",
        themePreference: req.session.user.themePreference,
      });
    }
  } else {
    return res.redirect("/signinuser");
  }
});

app.use("/signoutuser", (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.redirect("/signinuser");
  }
});

constructorMethod(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
