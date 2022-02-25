var express = require('express');
var router = express.Router();

// other modules
var homeController	= require("./home.controller");
var productController  = require("./product.controller");
//var addProductToCart = require("./cart.controller");
var showShoppingCart = require("./shoppingcart.controller");
var orderController = require("./order.controller");
var userController = require("./user.controller");
var productController = require("./product.controller");
var customerController = require("./customer.controller");
var cartController = require("./cart.controller");



// router for home and user login
router.get('/', function(req, res, next) {
  res.redirect('/home');
});
router.get('/home', 						homeController.displayHomePage);
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
router.post('/home/cart/add',           cartController.addProductToCart);
router.get('/home/cart/add/:id',          cartController.addProductToCart);
router.get('/home/shopping-cart/:action',           showShoppingCart);
router.post('/home/shopping-cart/checkout',                 orderController.postOrder);
router.post('/home/shopping-cart/update',               orderController.updateOrder);
router.get('/home/orders',            orderController.getOrders);
router.get('/home/orders/:orderid',     orderController.getOrderHistory);
router.get('/home/remove/:productId/:action',       orderController.removeItem);
router.get('/home/cart/update/:productId/:quantity/:action',     cartController.updateProductToCart);


//router for customer
router.get('/home/customers',         customerController.getCustomerList);
router.get('/home/customer/:id',       customerController.getCustomerOrderList);       
router.get('/home/customer/order/edit/:userid/:orderid',         customerController.editOrder);
router.get('/home/customer/order/delete/:userid/:orderid',         customerController.deleteOrder);


//router for user to search product on the website
router.get('/products/search',             homeController.search);

module.exports = router;
