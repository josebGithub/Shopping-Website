const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

module.exports =  async (req, res, next) => {
    try {

      let action = req.params.action;

      if (typeof req.session.cart === "undefined") {
        let error = 'Empty shopping cart!';
        return res.render('errorView', {title : 'Error Page', type: 'msg', error});
      }

      let cart = new ShoppingCart(req.session.cart);

      if (!cart) {
        let error = 'Empty shopping cart!';
        return res.render('errorView', {title : 'Error Page', type: 'msg', error});
      }
      
      if (action === 'checkout') 
            res.render('shoppingcartView', {title:"Shopping Cart",
                 data: cart, action: action, shoppingCartPage:true});
      else {
            res.render('shoppingcartView', {title:"Shopping Cart",
              data: cart, action: action, shoppingCartPage:true, admin: true});
      }
    } catch (err) {
        console.log("Error selecting : %s ", err);
        console.error(err);
    }
}
