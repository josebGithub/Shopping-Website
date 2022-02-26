var express = require('express');
var router = express.Router();


// other modules
var homeController	= require("./home.controller");
var productController  = require("./product.controller");
//var addProductToCart = require("./cart.controller");
var showShoppingCart = require("./shoppingcart.controller");
var orderController = require("./order.controller");
var userController = require("./user.controller");
var hasRoles = userController.roles;
var productController = require("./product.controller");
var customerController = require("./customer.controller");
var cartController = require("./cart.controller");
var restApiController = require("./restapi.controller");
//const req = require('express/lib/request');



// router for home and user login
router.get('/', function(req, res, next) {
  res.redirect('/home');
});
router.get('/home', 						homeController.displayHomePage);
router.get('/login',                  userController.login);
router.post('/userauth',             userController.userAuth);
router.get('/logout',               userController.logout);

//router for products
router.get('/home/products/:type', 			    productController.getProductsDisplay);
router.get('/home/products',  hasRoles(['admin']),   productController.getProductList);
router.get('/home/product/add',        hasRoles(['admin']),  productController.addProduct);
router.post('/home/product/add',         hasRoles(['admin']),  productController.saveProduct);
router.get('/home/product/edit/:id',        hasRoles(['admin']),     productController.editProduct);
router.post('/home/product/edit/:id',        hasRoles(['admin']),   productController.saveEditProduct);
router.get('/home/product/delete/:id',         hasRoles(['admin']),    productController.deleteProduct);
router.post('/home/product/delete/:id',        hasRoles(['admin']),   productController.saveDeleteProduct);


//router for shopping cart and order
router.post('/home/cart/add',           cartController.addProductToCart);
router.get('/home/cart/add/:id',          cartController.addProductToCart);
router.get('/home/shopping-cart/:action',           showShoppingCart);
router.post('/home/shopping-cart/checkout',                 orderController.postOrder);
router.post('/home/shopping-cart/update',               orderController.updateOrder);
router.get('/home/orders',            orderController.getOrders);
router.get('/home/orders/:orderid',     orderController.getOrderHistory);
router.get('/home/remove/:productId/:action',       orderController.removeItem);
router.get('/home/cart/update/:productId/:quantity/:action',   cartController.updateProductToCart);
router.get('/home/order/cancel',                        orderController.cancelOrder);


//router for customer
router.get('/home/customers',         hasRoles(['admin']), customerController.getCustomerList);
router.get('/home/customer/:id',      hasRoles(['admin']),  customerController.getCustomerOrderList);       
router.get('/home/customer/order/edit/:userid/:orderid',    hasRoles(['admin']),      customerController.editOrder);
router.get('/home/customer/order/delete/:userid/:orderid',      hasRoles(['admin']),    customerController.deleteOrder);
router.get('/home/customer/order/cancel',   customerController.cancelEditOrder);

//router for user to search product on the website
router.get('/products/search',             restApiController.searchProductsByNameOrType );


//router for REST APIs (json)
router.get('/search/products',            restApiController.getAllProducts);
router.get('/search/products/:name',            restApiController.getProductByName);
router.get('/search/products/price/range',            restApiController.getProductsByPriceRange);


module.exports = router;
