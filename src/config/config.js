const dotenv = require("dotenv");
dotenv.config();

const development = {
  username: "root",
  password: "AtishayCar@0987",
  database: "Authentication",
  host: "127.0.0.1",
  dialect: "mysql",
};

const production = {
  use_env_variable: "DATABASE_URL",
  dialect: "mysql",
};

module.exports = {
  development,
  production,
};
