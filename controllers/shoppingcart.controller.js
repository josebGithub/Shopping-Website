const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');


//To display the order(list all the items) by rendering to the shoppingcartView which will
//display the order in the Shopping Cart of the customer or the Update order of the admin
module.exports =  async (req, res, next) => {
    try {

      let action = req.params.action;

      if (typeof req.session.cart === "undefined") {
        if (req.session.usertype === 'admin') {
          let error = "Empty shopping cart!";
          return res.render('errorView', {title : 'Error Page', type: 'msg', error, admin:true}); 
        } else {
          let error = "Empty shopping cart!";
          return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
        }
      }

      let cart = new ShoppingCart(req.session.cart);

      if (!cart) {
        if (req.session.usertype === 'admin') {
          let error = "Empty shopping cart!";
          return res.render('errorView', {title : 'Error Page', type: 'msg', error, admin:true}); 
        } else {
          let error = "Empty shopping cart!";
          return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
        }
      }
      
      if (action === 'checkout') 
            res.render('shoppingcartView', {title:"Shopping Cart",
                 data: cart, action: action, shoppingCartPage:true});
      else {
            res.render('shoppingcartView', {title:"Shopping Cart",
              data: cart, action: action, shoppingCartPage:true, admin: true});
      }
    } catch (err) {
        let error = "shoppingcart.controller : Error to create a Shopping Cart : "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }
}
