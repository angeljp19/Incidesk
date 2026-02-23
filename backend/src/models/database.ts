import { Sequelize } from "sequelize";
import 'dotenv/config'


export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  ssl: true,
  set: "pg",
  logging: false
});

const testConnection = async () => {
  try {
    console.log("Testing database connection...")
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection()
