<<<<<<< HEAD
require('dotenv').config();

const config = {
  "development": {
    "username": process.env.DB_USERNAME ,
    "password": process.env.DB_PASSWORD ,
    "database": process.env.DB_NAME ,
    "host": process.env.DB_HOST ,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME ,
    "password": process.env.DB_PASSWORD ,
    "database": process.env.DB_NAME ,
    "host": process.env.DB_HOST ,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT || 5432,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
};

=======
require('dotenv').config();

const config = {
  "development": {
    "dialect": process.env.DB_DIALECT || "sqlite",
    "storage": process.env.DB_STORAGE || "./database.sqlite",
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "postgres",
    "database": process.env.DB_NAME || "canteen",
    "host": process.env.DB_HOST || "127.0.0.1"
  },
  "test": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "postgres",
    "database": process.env.DB_NAME || "canteen",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT || 5432,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
};

>>>>>>> 179a419733fa656deb8455f3c816b52a8d987f50
module.exports = config;