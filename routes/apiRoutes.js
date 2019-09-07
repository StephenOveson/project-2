/* eslint-disable no-unused-vars */
var db = require("../models");
var bcrypt = require("bcrypt");

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

  app.get("/api/customer", function(req, res) {
    res.json(req.user);
  });

  app.get("/api/cosmetologist", function(req, res) {
    db.Cosmetologists.findAll({
      where: req.body.email
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/cosmetologist/service/:id", function(req, res) {
    db.Cosmetologists.findAll({
      include: [{ model: db.Services, where: { id: req.params.id } }]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/availabilities/:id", function(req, res) {
    db.Availability.findAll({
      where: { CosmetologistId: req.params.id }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/appointment", function(req, res) {
    db.Appointments.findAll({
      where: { CustomerId: req.user[0].id }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/customer/new", function(req, res) {
    var data = req.body;
    db.Customers.create({
      Name: data.Name,
      Email: data.Email.toLowerCase(),
      Phone: data.Phone,
      Address: data.Address,
      City: data.City,
      State: data.State,
      Zip: data.Zip,
      Password: bcrypt.hashSync(data.Password, bcrypt.genSaltSync(2))
    }).then(function() {
      res.redirect("/sign-in.html");
    });
  });

  app.post("/api/cosmetologist/new", function(req, res) {
    var data = req.body;
    db.Cosmetologists.create({
      Name: data.Name,
      Email: data.Email.toLowerCase(),
      Phone: data.Phone,
      Address: data.Address,
      City: data.City,
      State: data.State,
      Zip: data.Zip,
      Password: bcrypt.hashSync(data.Password, bcrypt.genSaltSync(2))
    }).then(function() {
      res.redirect("/sign-in.html");
    });
  });

  app.post("/api/appointment/new", function(req, res) {
    var data = req.user[0];
    db.Appointments.create({
      Time: req.body.Time,
      Address: data.Address,
      City: data.City,
      State: data.State,
      Zip: data.Zip,
      CosmetologistId: req.body.cosmetologistId,
      CustomerId: data.id,
      ServiceId: req.body.serviceId
    }).then(function() {
      res.redirect("/profile.html");
    });
  });

  app.delete("/api/customer/:id", function(req, res) {
    db.Customers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.redirect("/");
    });
  });
};

//   FUTURE DEVELOPMENT locationService

//   app.post("/api/locations/new", function(req, res) {
//     var data = req.body;
//     db.locations
//       .create({
//         Name: data.Name,
//         Address: data.Address,
//         lat: data.lat,
//         lng: data.lng
//       }).then(function(data){
//         res.send(xml({a: [{_attr:row
//         }]})) === '<a'
//       })
//     })
// }
