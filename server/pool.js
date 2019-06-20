const { Pool } = require("pg");

const {
  DB_USERNAME,
  DB_HOST,
  DB_NAME,
  DB_PWD,
  DB_PORT,
  DB_MAX_CONNECTIONS
} = process.env;

const url =
  "postgres://pcaahclq:0IiL4iHED2nFPNQChbfDd_w0rz_dEigx@raja.db.elephantsql.com:5432/pcaahclq";
const pool = new Pool({
  connectionString: url
  // user: DB_USERNAME,
  // host: DB_HOST,
  // database: DB_NAME,
  // password: DB_PWD,
  // port: DB_PORT,
  // max: DB_MAX_CONNECTIONS,
  // idleTimeoutMillis: 30000,
  // _connectionTimeoutMillis: 2000
});

module.exports = pool;
