module.exports = function(sequelize, DataTypes){
    let Cosmetologist = sequelize.define("Cosmetologist", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        password: DataTypes.STRING,
        address: DataTypes.TEXT
    });
    return Cosmetologist;
}