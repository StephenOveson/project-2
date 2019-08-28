module.exports = function(sequelize, DataTypes) {
  var Cosmetologists = sequelize.define("Cosmetologists", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    address: DataTypes.TEXT
  });
  return Cosmetologists;
};
