module.exports = (sequelize, DataTypes) => {
    const Responses = sequelize.define(
      "responses",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER(20),
        },
        form_id: {
            allowNull: false,
            type: DataTypes.INTEGER(20),
        },
        response: {
            type: DataTypes.JSON(),
            allowNull: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(100)
        },
        createdAt: { 
           type: DataTypes.DATE, 
           field: "created_at" 
        },
        updatedAt: { 
           type: DataTypes.DATE,
           field: "updated_at" 
        },
      },
      {
        timestamps: true,
      }
    );

    return Responses
}