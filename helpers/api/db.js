import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

export const db = {
  initialized: false,
  initialize,
};

async function initialize() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dialect: "mysql",
      define: {
        // Prevent sequelize from pluralizing table names
        freezeTableName: true,
      },
    }
  );

  const User = userModel(sequelize);
  const Score = scoreModel(sequelize);

  User.hasMany(Score, { foreignKey: "userId" });
  Score.belongsTo(User, { foreignKey: "userId" });

  console.log("Before sequelize.sync");
  await sequelize.sync({ alter: true });
  console.log("After sequelize.sync");
  // Sync all models with the database

  db.User = User;
  db.Score = Score;

  db.initialized = true;
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
    gameType: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER },
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
