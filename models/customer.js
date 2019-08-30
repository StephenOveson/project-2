module.exports = function(sequelize, DataTypes) {
  var Customers = sequelize.define("Customers", {
    Name: DataTypes.STRING,
    Phone: DataTypes.INTEGER,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING
  });
  return Customers;
};
