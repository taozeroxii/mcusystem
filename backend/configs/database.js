const { Pool, Client } = require('pg')
const pgconnection = new Pool({
  host:      process.env.PGSQL_HOST,
  user:      process.env.PGSQL_USER,
  password:  process.env.PGSQL_PASSWORD,
  database:  process.env.PGSQL_DB,
  charset:'utf8',
  port: 5432
});

module.exports = pgconnection;
