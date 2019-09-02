var db = require("../models");
var bcrypt = require("bcrypt");
// var Op = Sequelize.Op

module.exports = function(app) {
  app.get("/api/services", function(req, res) {
    db.Services.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/login/", function(req, res) {
    db.Customers.findOne({
      where: req.body.email
    }).then(function(data) {
      if (req.body.password === data.password) {
        res.json(data);
      }
    });
  });

  app.get("/api/me", function(req, res) {
    console.log(req.user);
    res.json(req.user);
  });

  app.post("/sign-up", function(req, res) {
    var data = req.body;
    db.Customers.create({
      Name: data.Name,
      Email: data.Email,
      Phone: data.Phone,
      Address: data.Address,
      City: data.City,
      State: data.State,
      Zip: data.Zip,
      Password: bcrypt.hashSync(data.Password, bcrypt.genSaltSync(2))
    }).then(function() {
      res.redirect("/");
    });
  });

  app.post("/api/customer/:email", function(req, res) {
    var password = req.body.password;
    if (passwordCheck(id, password)) {
      db.Customers.update(
        {
          Email: req.body.email
        },
        {
          where: {
            Email: req.params.email
          }
        }
      ).then(function(data) {
        res.json(data);
      });
    }
  });

  app.delete("/api/customer/:id", function(req, res) {
    db.Customers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
};
