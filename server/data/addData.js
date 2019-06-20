const pool = require("../pool");
if (pool.totalCount > 0) {
  console.warn("totalConnections from the pool should be 0");
  process.exitCode = 1;
  return;
}


const DROP_TABLES = `DROP TABLE "users", "products";`;

// new table: users
// _id SERIAL, user_id, name, usr_pic, email
const CREATE_USER_TABLE = `CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  user_id TEXT UNIQUE,
  name TEXT,
  usr_pic TEXT,
  email TEXT
);`;

// table products
// u_id, prod_name, prod_desc, prod_price, img_url, stock, zipcode, location
const CREATE_PRODUCTS_TABLE = `CREATE TABLE products (
  _id SERIAL PRIMARY KEY,
  u_id TEXT REFERENCES users(user_id) NOT NULL,
  prod_name TEXT NOT NULL,
  prod_desc TEXT NOT NULL, 
  prod_price INTEGER NOT NULL,
  img_url TEXT NOT NULL,
  stock BOOLEAN,
  zipcode TEXT,
  location TEXT
);`;

const dropTables = () => {
  return new Promise((resolve, reject) => {
    pool.query(DROP_TABLES, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createUsers = () => {
  return new Promise((resolve, rejet) => {
    pool.query(CREATE_USER_TABLE, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};



const createProduct = () => {
  return new Promise((resolve, reject) => {
    pool.query(CREATE_PRODUCTS_TABLE, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

dropTables()
  .then(createUsers)
  .then(createProduct)
  .then(() => {
    console.log("DATA RESET COMPLETE");
    return pool.end();
  })
  .catch(err => {
    console.error(err);
    return pool.end();
  });
