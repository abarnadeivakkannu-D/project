import Sequelize from "sequelize";
import env from "./env.js";

import users from "../model/users.js";
import uploadModel from "../model/upload.model.js";
import companyModel from "../model/company.model.js";

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  logging: console.log,
  define: {
    timestamps: false
  },
  pool: env.pool,
  dialectOptions: {
    useUTC: false
  },
  timezone: "+05:30",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.users = users(sequelize, Sequelize.DataTypes);
db.upload = uploadModel(sequelize, Sequelize.DataTypes);
db.company = companyModel(sequelize, Sequelize.DataTypes);

// ASSOCIATIONS
db.upload.belongsTo(db.users, {
  foreignKey: "userId"
});
db.users.hasMany(db.upload, {
  foreignKey: "userId"
});

db.users.belongsTo(db.company, {
  foreignKey: "company_id"
});
db.company.hasMany(db.users, {
  foreignKey: "company_id"
});

// TEST CONNECTION
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync();
    console.log("Models synced.");
  } catch (err) {
    console.error("Unable to connect to database:", err);
  }
})();

export default db;
