module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define(
    "Availability",
    {
      dayOfWeek: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  Availability.associate = function(models) {
    models.Cosmetologists.hasOne(models.Availability);
  };
  return Availability;
};
