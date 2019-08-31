module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define("Availability", {
    dayOfWeek: DataTypes.STRING
  });
  Availability.associate = function(models) {
    models.Cosmetologists.hasOne(models.Availability);
  };
  return Availability;
};
