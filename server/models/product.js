const pool = require('../pool');

// const GET_ALL = `SELECT "Product"."SKU", "Product"."product_name", "size", "inventory", "price", "Category"."category_name" from 
// "Product" join "Category" on "Product"."category_id"="Category"."category_id";`;

const GET_ALL = `SELECT * FROM products;`;

const GET_USER_PRODUCTS = `SELECT * FROM products INNER JOIN users ON users.user_id = products.u_id WHERE users.user_id=`;

const GET_ALL_PRODUCTS = `SELECT "users"."name", "users"."email", "products".* FROM products INNER JOIN users ON "products"."u_id" = "users"."user_id";`;


// const UPDATE_INVENTORY = `UPDATE "Product" SET "inventory" = "inventory" - `;

// const UPDATE_SKU = ` WHERE "SKU"=`;

const productModel = {
  //returns all shoes from database
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query(GET_ALL_PRODUCTS, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    })
  },

  getUserProducts(userId) {
    return new Promise((resolve, reject) => {
      pool.query(GET_USER_PRODUCTS + userId + ";", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    })
  },
  //takes in cart obj with keys of SKU number and values of the quantities bought of each
  updateInventory(cart) {
    return new Promise((resolve, reject) => {
      const SKUs = Object.keys(cart);
      for (let i = 0; i < SKUs.length; i += 1) {
        pool.query(UPDATE_INVENTORY + cart[SKUs[i]] + " " + UPDATE_SKU + SKUs[i] + ";", (err, result) => {
          if (err) return reject(err);
          resolve(result);
        })
      }
    })
  }
};

module.exports = productModel;

// const GET_CATEGORY = `SELECT "Product"."SKU", "Product"."product_name", "size", "inventory", "price", "Category"."category_name" from
// "Product" join "Category" on "Product"."category_id"="Category"."category_id" WHERE "Category"."category_name"=`;

  //returns all shoes based off brand name
  // getCategory(categoryName) {
  //   return new Promise((resolve, reject) => {
  //     pool.query(GET_CATEGORY + `'${categoryName}'` + ";", (err, result) => {
  //       if (err) return reject(err);
  //       resolve(result);
  //     })
  //   })
  // },