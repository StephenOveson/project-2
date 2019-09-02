module.exports = function(sequelize, DataTypes) {
  var Services = sequelize.define(
    "Services",
    {
      name: DataTypes.STRING,
      cost: DataTypes.DECIMAL(10, 2)
    },
    {
      timestamps: false
    }
  );
  Services.associate = function(models) {
    models.Services.belongsToMany(models.Cosmetologists, {
      through: "CosmetologistService"
    });
  };
  return Services;
};
