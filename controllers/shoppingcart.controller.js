const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

module.exports =  async (req, res, next) => {
    try {
      let cart = new ShoppingCart(req.session.cart);

      if (!cart)
        return res.render('No item in shopping cart!');

      console.log("Shopping Cart result : ");
      console.log(cart);
      res.render('shoppingcartView', {title:"Shopping Cart",
                 data: cart, shoppingCartPage:true});
    } catch (err) {
        console.log("Error rendering to shopping cart page : %s ", err);
        console.error(err);
    }
}
