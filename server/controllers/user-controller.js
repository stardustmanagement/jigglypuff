const User = require('../models/user');

const userCtrl = {};
/**
* getAllProducts - returns all products
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback Function w signature (err, users)
*/
// middleware to handle creating a new user, and adding to "users" table
userCtrl.createNewUser = (req, res) => {};
// middleware to return only the user's items for crud operations
userCtrl.getMyProducts = (req, res) => {};
// middleware to delete product
userCtrl.deleteProduct = (req, res) => {
  User.deleteProduct(req.body).then(result => {
    res.locals.success = "Product deleted"
    next();
  }).catch(err => next(err));
};
// middleware to allow users to add products with corresponding u_id
userCtrl.addNewProduct = (req, res) => {
  User.newProduct(req.body)
    .then(result => {
      res.locals.success = "Product successfully added"
      next();
    })
    .catch(err => next(err));
};

module.exports = userCtrl;
