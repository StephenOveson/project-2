module.exports = function(sequelize, DataTypes) {
  var Services = sequelize.define("services", {
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10, 2)
  });
  return Services;
};
