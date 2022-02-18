const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');

module.exports =  async (req, res, next) => {

console.log("Call cart.controller.js...");
console.log("req.session.cart(should be empty) : ");
console.log(req.session.cart);

let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});


const product = await Product.findById(req.body.id);

    if (!product)
        return res.render('404View');
  
    cart.add(product, product.id, parseInt(req.body.quantity));
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/home/pastries');
       
 };
 