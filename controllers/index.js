var express = require('express');
var router = express.Router();

// other modules
var displayHomePage 	= require("./home.controller");
var displayPastriesPage   = require("./pastries.controller");
var addProductToCart = require("./cart.controller");
var showShoppingCart = require("./shoppingcart.controller");
var orderController = require("./order.controller");


// router specs
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', 						displayHomePage);
router.get('/home/pastries', 			    displayPastriesPage);
router.post('/home/pastries/add',           addProductToCart);
router.get('/home/shopping-cart',           showShoppingCart);
router.get('/home/pastries/add/:id',          addProductToCart);
router.post('/home/checkout',                 orderController.postOrder);
router.get('/home/orders',            orderController.getOrders);
router.get('/home/orders:orderid',     orderController.getOrderHistory);

/** 
router.get('/employees/add', 				addEmployee);
router.post('/employees/add', 			saveEmployee);

router.get('/employees/edit/:id', 	editEmployee);
router.post('/employees/edit/', 	saveAfterEdit);

router.get('/employees/delete/:id', deleteEmployee);
router.post('/employees/delete', deleteEmployeeAfterConfirm);
*/
module.exports = router;
