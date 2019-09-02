module.exports = function(sequelize, DataTypes) {
  var Customers = sequelize.define("Customers", {
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zip: DataTypes.STRING,
    Password: DataTypes.STRING
  });
  return Customers;
};
