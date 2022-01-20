"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
    // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          name: "idUser",
          allowNull: false,
        },
      });
      // models.Post.hasMany(models.Comment, {
      //   foreignKey: {
      //     name: "idPosts",
      //     allowNull: false,
      //   },
      // });
    }
  }

  Post.init(
    {
      iduser: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};