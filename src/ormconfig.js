module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "beatcharts",
    "synchronize": true,
    "entities": [
      "src/db/entity/**/*.ts"
    ],
    "subscribers": [
      "src/db/subscriber/*.ts"
    ],
    "migrations": [
      "src/db/migration/*.ts"
    ],
    "cli": {
      "entitiesDir": "src/db/entity/**/*.ts",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  }