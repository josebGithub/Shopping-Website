const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');

exports.addProductToCart =  async (req, res, next) => {

    let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});

    try {
        const product = await Product.findById(req.body.id);

        try {
            if (!product) {
                let error = 'No product found!'
                return res.render('errorView', {title: 'Error Page', type: 'err', error});
            }
                
            cart.add(product, parseInt(req.body.quantity));
            req.session.cart = cart;
            res.redirect('/home/products/'+product.type);
        } catch (err) {
            let error = 'Error adding the item to the cart : %s '+err;
            return res.render('errorView', {title : 'Error Page', type: 'msg', error});
        }
    } catch (err) {
        let error = 'Error rendering to shopping cart page : %s '+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error});
    }
       
};

exports.updateProductToCart = async (req, res, next) => {

    
    let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});
   
    try {
        let productId = req.params.productId;
        let itemQty = req.params.quantity;
        let action = req.params.action;
       
        const product = await Product.findById(productId);

        try {
            if (!product) {
                let error = 'No product found!';
                return res.render('errorView', {title : 'Error Page', type: 'msg', error});
            }
              
            cart.update(product, parseInt(itemQty));
            req.session.cart = cart;
 
                res.redirect('/home/shopping-cart/'+action);
        } catch (err) {
            let error = 'Error updating the item to the cart : %s '+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error});
        }
    } catch (err) {
        let error = "Error rendering to shopping cart page : %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error});
    }
       
};
 