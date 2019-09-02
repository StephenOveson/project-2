module.exports = function(sequelize, DataTypes) {
  var Cosmetologists = sequelize.define("Cosmetologists", {
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.INTEGER,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zip: DataTypes.STRING,
    Password: DataTypes.STRING
  });
  Cosmetologists.associate = function(models) {
    models.Cosmetologists.belongsToMany(models.Services, {
      through: "CosmetologistService"
    });
  };
  return Cosmetologists;
};
