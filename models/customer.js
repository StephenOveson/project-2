module.exports = function(sequelize, DataTypes) {
  let Customers = sequelize.define("Customers", {
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return Customers;
};
