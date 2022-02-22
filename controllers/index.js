var express = require('express');
var router = express.Router();

// other modules
var displayHomePage 	= require("./home.controller");
var productController  = require("./product.controller");
var addProductToCart = require("./cart.controller");
var showShoppingCart = require("./shoppingcart.controller");
var orderController = require("./order.controller");
var userController = require("./user.controller");
var productController = require("./product.controller");



// router specs
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', 						displayHomePage);
router.get('/home/login',                  userController.login);
router.post('/home/auth',             userController.userAuth);
router.get('/home/product/:type', 			    productController.getProductsDisplay);
router.get('/home/products',            productController.getProductList);
router.post('/home/cart/add',           addProductToCart);
router.get('/home/cart/add/:id',          addProductToCart);
router.get('/home/shopping-cart',           showShoppingCart);
router.post('/home/checkout',                 orderController.postOrder);
router.get('/home/orders',            orderController.getOrders);
router.get('/home/orders/:orderid',     orderController.getOrderHistory);
router.get('/home/remove/:productId',       orderController.removeItem);


/** 
router.get('/employees/add', 				addEmployee);
router.post('/employees/add', 			saveEmployee);

router.get('/employees/edit/:id', 	editEmployee);
router.post('/employees/edit/', 	saveAfterEdit);

router.get('/employees/delete/:id', deleteEmployee);
router.post('/employees/delete', deleteEmployeeAfterConfirm);
*/
module.exports = router;
