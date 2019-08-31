module.exports = function(sequelize, DataTypes) {
  var Customers = sequelize.define("Customers", {
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.INTEGER,
    Address: DataTypes.STRING,
    Password: DataTypes.STRING
  });
  return Customers;
};
