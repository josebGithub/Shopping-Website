var express = require('express');
var router = express.Router();

// other modules
var displayHomePage 	= require("./home.controller");
var displayPastriesPage   = require("./pastries.controller");
var addProductToCart = require("./cart.controller");
var showShoppingCart = require("./shoppingcart.controller");

/** 
var addEmployee 		= require("./addEmployee");
var saveEmployee 		= require("./saveEmployee");
var editEmployee 		= require("./editEmployee");
var saveAfterEdit 	    = require("./saveAfterEdit");
var deleteEmployee 		= require("./deleteEmployee");
var deleteEmployeeAfterConfirm 	= require("./deleteEmployeeAfterConfirm");
*/

// router specs
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', 						displayHomePage);
router.get('/home/pastries', 			    displayPastriesPage);
router.post('/home/pastries/add',           addProductToCart);
router.get('/home/shopping-cart',           showShoppingCart);
router.get('/home/pastries/add/:id',          addProductToCart);

/** 
router.get('/employees/add', 				addEmployee);
router.post('/employees/add', 			saveEmployee);

router.get('/employees/edit/:id', 	editEmployee);
router.post('/employees/edit/', 	saveAfterEdit);

router.get('/employees/delete/:id', deleteEmployee);
router.post('/employees/delete', deleteEmployeeAfterConfirm);
*/
module.exports = router;
