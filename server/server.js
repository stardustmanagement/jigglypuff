const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/api");
const { PORT } = process.env;

const pool = require("./pool");

const app = express();

// creates new instance of Google Strategy
// generic register for passport.use
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // new Pool({ user: profile.id });
      pool.query(`INSERT INTO users(user_id, name, usr_pic, email) VALUES (
          '${profile.id}',
          '${profile.displayName}',
          '${profile.photos[0].value}', 
          '${profile.emails[0].value}');`);
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile:", profile);
    }
  )
);
// route to auth/google at localhost:3000/auth/google -> redirects to google login
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// callback method for data (redirect), must be configured on Google Console.
app.get("/auth/google/callback", passport.authenticate("google"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static route to access images hosted in server
app.use("/static", express.static(path.join(__dirname, "public")));

//express router
app.use("/api", routes);

//404 err handling
app.use(function(req, res, next) {
  res.locals.message = "PAGE NOT FOUND";
  const err = new Error("RESOURCE NOT FOUND");
  err.status = 404;
  return next(err);
});

// Dedicated error handler
app.use(function(err, req, res, next) {
  res.status(404).json(err);
});

app.listen(3000, () => {
  console.log(`server listening on port ${PORT}`);
});
