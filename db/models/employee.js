"use strict";
const { Model, Sequelize } = require("sequelize");
// import { v4 as uuid } from "uuid";
const { v4: uuid } = require("uuid");

const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "employee",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: uuid,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM("male", "female"),
      allowNull: false,
    },
    mobile: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    modelName: "employee",
  }
);
