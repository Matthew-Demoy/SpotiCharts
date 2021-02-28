module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "password",
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