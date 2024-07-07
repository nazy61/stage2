"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserOrganisations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        orgId: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  UserOrganisations.init(
    {
      orgId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "userOrganisations",
      modelName: "UserOrganisations",
    }
  );
  return UserOrganisations;
};
