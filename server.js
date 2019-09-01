// require("dotenv").config();
var express = require("express");
// var exphbs = require("express-handlebars");
var path = require("path");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var session = require("express-session");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "test" }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      console.log("About to check database!");
      db.Customers.findAll({ where: { Email: email } })
        .then(function(user) {
          if (!user) {
            console.log("wrong email");
            return done(null, false, { message: "Incorrect email." });
          }
          console.log(user);
          console.log("This is the password " + password);
          bcrypt
            .compare(password, user[0].dataValues.Password)
            .then(function(isMatch) {
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Incorrect password." });
              }
            })
            .catch(function(err) {
              return done(err);
            });
        })
        .catch(function(err) {
          return done(err);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Customers.prototype.generateHash = function(password) {
//   return bcrypt.hash(password, bcrypt.genSaltSync(5));
// };

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
