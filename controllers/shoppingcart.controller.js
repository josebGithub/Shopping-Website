const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

module.exports =  async (req, res, next) => {
    try {

      let action = req.params.action;
      let cart = new ShoppingCart(req.session.cart);

      if (!cart)
        return res.render('No item in shopping cart!');

      
      res.render('shoppingcartView', {title:"Shopping Cart",
                 data: cart, action: action, shoppingCartPage:true});
    } catch (err) {
        console.log("Error selecting : %s ", err);
        console.error(err);
    }
}
