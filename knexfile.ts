import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: "postgres_db_top_finance",
      database: "top_finance",
      user: "postgres",
      password: "D0us5xm4",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: './seeds',
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "postgres_db_top_finance",
      database: "top_finance",
      user: "postgres",
      password: "D0us5xm4",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "postgres_db_top_finance",
      database: "top_finance",
      user: "postgres",
      password: "D0us5xm4",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: './seeds',
    },
  }

};

module.exports = config;
