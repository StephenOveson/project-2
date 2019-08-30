// var db = require("../models");
var path = require("path");

var html = ".html";

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home_page.html"));
  });

  app.get("/sign-up" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/sign-up.html"));
  });

  app.get("/apply" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/apply.html"));
  });

  app.get("/contact" + html, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/contact.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/404.html"));
  });
};
