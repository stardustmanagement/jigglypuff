const pool = require("../pool");
userModel = {
  // add a product to products database
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
  }
};

module.exports = userModel;
