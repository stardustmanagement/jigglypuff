const express = require("express");
const app = express();
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/api");
var cors = require('cors');
const { PORT } = process.env;

const pool = require("./pool");


app.use(
  cors({
    origin: "true", // allow to server to accept request from different origin
    methods: "GET,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// returns user id
passport.serializeUser((user, done) => {
  // console.log("USER", user);
  done(null, user.rows[0]._id);
});

passport.deserializeUser((id, done) => {
  pool
    .query(`SELECT _id, user_id, name, usr_pic FROM users where _id = '${id}';`)
    .then(user => {
      done(null, user);
    });
});

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
      pool
        .query(`SELECT * FROM users WHERE user_id = '${profile.id}';`)
        .then(existingUser => {
          if (existingUser.rows[0]) {
            done(null, existingUser);
          } else {
            pool
              .query(
                `INSERT INTO users(user_id, name, usr_pic, email) VALUES (
              '${profile.id}',
              '${profile.displayName}',
              '${profile.photos[0].value}', 
              '${profile.emails[0].value}');`
              )
              .then(user => done(null, user));
            // console.log("access token", accessToken);
            // console.log("refresh token", refreshToken);
            // console.log("profile:", profile);
          }
        });
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
// needs to be configured soon
app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:8080");
});

app.get("/api/current_user", (req, res) => {
  console.log('In server - fetching user ID: ', req.user.rows[0].user_id);
  res.locals.currentUserId = req.user.rows[0].user_id;
  res.json(res.locals.currentUserId);
  // res.json(req.user.rows[0].user_id);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

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
