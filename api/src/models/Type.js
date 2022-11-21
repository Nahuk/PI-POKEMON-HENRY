const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define ('type', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};

// el id lo genera sequelize de manera automatica 