module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
  var Services = sequelize.define("services", {
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10, 2)
  });
  return Services;
};
=======
    let Services = sequelize.define("services", {
        name: DataTypes.STRING,
        cost: DataTypes.DECIMAL(10, 2)
    })
}
>>>>>>> dev
