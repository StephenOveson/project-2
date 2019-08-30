module.exports = function(sequelize, DataTypes) {
  var Cosmetologists = sequelize.define("Cosmetologists", {
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.INTEGER,
    Address: DataTypes.TEXT,
    Password: DataTypes.STRING,
    "Men's Cut": DataTypes.BOOLEAN,
    "Women's Cut": DataTypes.BOOLEAN,
    "All Over Color": DataTypes.BOOLEAN,
    "Partial highlight": DataTypes.BOOLEAN,
    "Full Highlight": DataTypes.BOOLEAN,
    "Partial Balayage": DataTypes.BOOLEAN,
    "Full Balayage": DataTypes.BOOLEAN,
    "Manicure Normal Polish": DataTypes.BOOLEAN,
    "Manicure Gel Polish": DataTypes.BOOLEAN,
    "Pedicure Normal Polish": DataTypes.BOOLEAN,
    "Pedicure Gel Polish": DataTypes.BOOLEAN,
    Facial: DataTypes.BOOLEAN
  });
  return Cosmetologists;
};
