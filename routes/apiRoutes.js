var db = require("../models");
// var Op = Sequelize.Op

module.exports = function(app) {
  app.get("/api/services", function(req, res) {
    db.Services.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/login/", function(req, res) {
    db.Customers.findOne({
      where: req.body.email || req.body.name
    }).then(function(data) {
      if (req.body.password === data.password) {
        res.json(data);
      }
    });
  });

  app.post("/api/customer", function(req, res) {
    var data = req.body;
    db.Customers.create(data).then(function(results) {
      res.json(results);
    });
  });

  app.delete("/api/customers/:id", function(req, res) {
    db.Customers.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
