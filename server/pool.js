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

const uriLocal = "postgres://dev:ilovetesting@localhost/drewslist";
const pool = new Pool({
  connectionString: url
});

module.exports = pool;
