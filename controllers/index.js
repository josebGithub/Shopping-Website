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
var customerController = require("./customer.controller");



// router for home and user login
router.get('/', function(req, res, next) {
  res.redirect('/home');
});
router.get('/home', 						displayHomePage);
router.get('/home/login',                  userController.login);
router.post('/home/auth',             userController.userAuth);

//router for products
router.get('/home/products/:type', 			    productController.getProductsDisplay);
router.get('/home/products',            productController.getProductList);
router.get('/home/product/add',         productController.addProduct);
router.post('/home/product/add',          productController.saveProduct);
router.get('/home/product/edit/:id',            productController.editProduct);
router.post('/home/product/edit/:id',          productController.saveEditProduct);
router.get('/home/product/delete/:id',            productController.deleteProduct);
router.post('/home/product/delete/:id',          productController.saveDeleteProduct);


//router for shopping cart and order
router.post('/home/cart/add',           addProductToCart);
router.get('/home/cart/add/:id',          addProductToCart);
router.get('/home/shopping-cart',           showShoppingCart);
router.post('/home/checkout',                 orderController.postOrder);
router.get('/home/orders',            orderController.getOrders);
router.get('/home/orders/:orderid',     orderController.getOrderHistory);
router.get('/home/remove/:productId',       orderController.removeItem);

//router for customer
router.get('/home/customers',         customerController.getCustomerList);
router.get('/home/customer/:id',       customerController.getCustomerOrderList);       
router.get('/home/customer/order/edit/:userid/:orderid',         customerController.editOrder);
router.get('/home/customer/order/item/edit/:userid/:orderid/:itemid',         customerController.editItem);
//router.post('/home/customer/order/edit/:userid/:orderid',           customerController.saveEditOrder);
//router.get('/home/customer/order/delete/:id',         customerController.deleteOrder);
//router.post('/home/customer/order/delete/:id',          customerController.saveDeleteOrder);

/** 
router.get('/employees/add', 				addEmployee);
router.post('/employees/add', 			saveEmployee);

router.get('/employees/edit/:id', 	editEmployee);
router.post('/employees/edit/', 	saveAfterEdit);

router.get('/employees/delete/:id', deleteEmployee);
router.post('/employees/delete', deleteEmployeeAfterConfirm);
*/
module.exports = router;
