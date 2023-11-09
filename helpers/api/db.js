import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

export const db = {
  initialized: false,
  initialize,
};

async function initialize() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`
    );

    const sequelize = new Sequelize(
      process.env.DB_DATABASE,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        define: {
          // Prevent sequelize from pluralizing table names
          freezeTableName: true,
        },
      }
    );

    const User = userModel(sequelize);
    const Score = scoreModel(sequelize);

    User.hasMany(Score, {
      foreignKey: "userId",
    });
    Score.belongsTo(User);

    await sequelize.sync(); // Sync all models with the database

    db.User = User;
    db.Score = Score;

    db.initialized = true;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error; // Rethrow the error to notify the calling code about the failure
  }
}

// sequelize models with schema definitions

function userModel(sequelize) {
  const attributes = {
    username: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}

function scoreModel(sequelize) {
  const attributes = {
    username: { type: DataTypes.STRING, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: [] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("Score", attributes, options);
}
