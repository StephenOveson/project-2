var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/customers", function(req, res) {
    db.Customers.findAll({}).then(function(dbcustomers) {
      res.json(dbcustomers);
    });
  });

  // Create a new example
  app.post("/api/customers", function(req, res) {
    db.Customers.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/customers/:id", function(req, res) {
    db.Customers.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
