const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');

exports.addProductToCart =  async (req, res, next) => {

    let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});
    //console.log('addProductToCart : ');
    //console.log(cart);
    try {
        const product = await Product.findById(req.body.id);

        try {
            if (!product) {
                let error = 'cart.controller.js addProductToCart : No product found!'
                return res.render('errorView');
            }
                
  
            cart.add(product, parseInt(req.body.quantity));
            req.session.cart = cart;
            res.redirect('/home/products/'+product.type);
        } catch (err) {
            console.log("Error adding the item to the cart : %s ", err);
            console.error(err);
        }
    } catch (err) {
        console.log("Error rendering to shopping cart page : %s ", err);
        console.error(err);
    }
       
};

exports.updateProductToCart = async (req, res, next) => {

    let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});
    //console.log('updateProductToCart : ');
    //console.log(cart);
    
    try {
        let productId = req.params.productId;
        let itemQty = req.params.quantity;
       
        const product = await Product.findById(productId);

        try {
            if (!product)
                return res.render('404View');
  
           // console.log(cart);
            cart.update(product, parseInt(itemQty));
            req.session.cart = cart;
 
           // console.log('updateProductToCart : ');
           // console.log(cart);
            res.redirect('/home/shopping-cart');
        } catch (err) {
            console.log("Error updating the item to the cart : %s ", err);
            console.error(err);
        }
    } catch (err) {
        console.log("Error rendering to shopping cart page : %s ", err);
        console.error(err);
    }
       
};
 