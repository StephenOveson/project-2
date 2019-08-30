module.exports = function(sequelize, DataTypes) {
  var Services = sequelize.define("Services", {
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10, 2)
  });
  return Services;
};
