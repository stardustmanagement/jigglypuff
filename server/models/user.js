const pool = require("../pool");
userModel = {
  // add a product to products database
  // json body: { "u_id":"value", "prod_name":"value", "prod_desc":"value" }
  newProduct(body) {
    // const newProductQuery = `INSERT INTO "public"."products" (u_id,prod_name,prod_desc,prod_price,img_url,stock,zipcode,location)
    //     VALUES ('${body.u_id}','${body.prod_name}','${body.prod_desc}','${
    //   body.prod_price
    // }','${body.img_url}','${body.stock}','${body.zip}','${body.loc}')`;
    console.log('Body in User Model: ', body);
    const newProductQuery = "INSERT INTO products (u_id, prod_name, prod_desc, prod_price, img_url, stock, zipcode, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

    const values = [
      body.u_id,
      body.prod_name,
      body.prod_desc,
      body.prod_price,
      body.img_url, 
      null,
      null,
      null
    ]

    return new Promise((resolve, reject) => {
      pool.query(newProductQuery, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
  // add a new user to the "users" table
  // body payload: { "u_id":"value", "name":"r kim", "img_url":"value", "email":"value" }
  // used for adding a new user to database
  newUser(body) {
    const newUserQuery = `INSERT INTO public.users (user_id,name,usr_pic,email)
        VALUES ('${body.u_id}','${body.name}','${body.img_url}','${
      body.email
    }')`;
    return new Promise((resolve, reject) => {
      pool.query(newUserQuery, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // returning user's products
  // body json should have at least: { "u_id":"value" }
  getMyProducts(body) {
    const myProductsQuery = `SELECT * FROM products INNER JOIN users ON users.user_id = products.u_id WHERE users.user_id=${
      body.u_id
    }`;
    return new Promise((resolve, reject) => {
      pool.query(myProductsQuery, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = userModel;
