const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');

module.exports =  async (req, res, next) => {

    let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});

    try {
        const product = await Product.findById(req.body.id);

        try {
            if (!product)
                return res.render('404View');
  
            cart.add(product, parseInt(req.body.quantity));
            req.session.cart = cart;
            res.redirect('/home/pastries');
        } catch (err) {
            console.log("Error adding the item to the cart : %s ", err);
            console.error(err);
        }
    } catch (err) {
        console.log("Error rendering to shopping cart page : %s ", err);
        console.error(err);
    }
       
};
 