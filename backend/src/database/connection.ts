import knex from 'knex'
import path from 'path'

const config = {
  default: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "database.sqlite"),
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
    },
    useNullAsDefault: true,
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "database.test.sqlite"),
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
    },
    useNullAsDefault: true,
  }
}

let db: knex<any | unknown[]>;
if (process.env.NODE_ENV === 'test') {
  db = knex(config.test)
} else {
  db = knex(config.default)
}

export default db