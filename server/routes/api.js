const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product-controller');
const userCtrl = require('../controllers/user-controller');

// Get all products
router.get('/products', productCtrl.getAllProducts, (req, res) => {
  res.status(200).json(res.locals.products)
});

router.delete('/deleteProduct', productCtrl.deleteProduct, (req, res) => {
  res.status(200).send('DELETE SUCCESSFUL');
});

//Get all products published by a specific user (if id is sent as part of query string)
// router.get('/products/:userId', productCtrl.getUserProducts, (req, res) => {
//   res.status(200).json(res.locals.products);
// });

//Add product to database
router.post('/newproduct', userCtrl.addNewProduct, (req, res) => {
  res.status(200).send('SUCCESSFUL ADD');
});



// Get all products in specific category
// router.get('/products/:category', productCtrl.getCategory, (req, res) => {
//   res.status(200).json(res.locals.category)
// });

// Post route to update inventory upon clicking purchase button
router.post('/purchase', productCtrl.updateInventory, (req, res) => {
  res.status(200).send(res.locals.success)
});

module.exports = router;
