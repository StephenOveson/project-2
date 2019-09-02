// var db = require("../models");
var path = require("path");
var passport = require("passport");
var html = ".html";

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../home_page.html"));
  });

  app.get("/home_page" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../home_page.html"));
  });

  app.get("/sign-up" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../sign-up.html"));
  });

  app.get("/sign-up", function(req, res) {
    res.sendFile(path.join(__dirname, "../sign-up.html"));
  });

  app.get("/sign-in" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../sign-in.html"));
  });

  app.get("/apply" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../apply.html"));
  });

  app.get("/dashboard" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../dashboard.html"));
  });

  app.get("/contact" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../contact.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../404.html"));
  });

  app.post(
    "/sign-in",
    passport.authenticate("local", {
      session: true,
      successRedirect: "/dashboard.html",
      failureRedirect: "/404"
    })
  );
};
