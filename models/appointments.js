module.exports = function(sequelize, DataTypes) {
  var Appointments = sequelize.define("Appointments", {
    Time: DataTypes.DATE,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zip: DataTypes.STRING
  });
  Appointments.associate = function(models) {
    models.Cosmetologists.hasOne(models.Appointments, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Customers.hasOne(models.Appointments, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Services.hasOne(models.Appointments, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Appointments;
};
