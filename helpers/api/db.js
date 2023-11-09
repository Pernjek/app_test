import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

export const db = {
  initialized: false,
  initialize,
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
  // create db if it doesn't already exist
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

  // connect to db
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
    }
  );

  // init models and add them to the exported db object
  const User = userModel(sequelize);
  const Score = scoreModel(sequelize);

  // init asscociations
  User.hasMany(Score, {
    foreignKey: "userId",
  });
  Score.belongsTo(User);

  db.User = User;
  db.Score = Score;

  // sync all models with database
  //await sequelize.sync({ alter: true });

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
