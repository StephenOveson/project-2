module.exports = function(sequelize, DataTypes) {
    let Services = sequelize.define("services", {
        name: DataTypes.STRING,
        cost: DataTypes.DECIMAL(10, 2)
    })
}