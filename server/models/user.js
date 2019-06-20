const pool = require("../pool");
userModel = {
  // add a product to products database
  // json body: { "u_id":"value", "prod_name":"value", "prod_desc":"value" }
  newProduct(body) {
    const newProductQuery = `INSERT INTO "public"."products" (u_id,prod_name,prod_desc,prod_price,img_url,stock,zipcode,location)
        VALUES ('${body.u_id}','${body.prod_name}','${body.prod_desc}','${
      body.prod_price
    }','${body.img_url}','${body.stock}','${body.zip}','${body.loc}')`;
    return new Promise((resolve, reject) => {
      pool.query(newProductQuery, (err, result) => {
        if (err) return reject(err);
        resolve(reject);
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
  },
  // delete's a user's product at _id
  // will use "_id" (product id)
  deleteProduct(body) {
    const deleteItemQuery = `DELETE FROM public.products
    WHERE "_id"=${body._id}`;
    return new Promise((resolve, reject) => {
      pool.query(deleteItemQuery, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    })
  }
};

module.exports = userModel;
