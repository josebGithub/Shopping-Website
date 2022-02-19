const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');

module.exports =  async (req, res, next) => {

    try {
        let cart = req.session.cart;
        
        if (!cart)
          return res.render('No item in shopping cart!');

        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
          
        today = mm + dd + yyyy;
        let oid = "WPN-"+"0000123"+today;
        let userid = "user0001";
        let customerName = 'customer1';
        let order = new Order ({ 
            orderid: oid,
            userid: userid,
            customerName: customerName,
            orderDate: today,
            orderList: []
        });

        order.orderList.push(cart);
        // If the same user, then add the cart to orderList


        try {
            const savedOrder = await order.save();
            res.redirect('/home');
            //res.status(200).json(JSON.stringify(savedEmployee));
          } catch (err) {
            console.error(err);
          }
  
      //  res.render('shoppingcartView', {title:"Check out",
       //            data: cart, tax: tax, shoppingCartPage:true});
      } catch (err) {
          console.log("Error rendering to checkout page : %s ", err);
          console.error(err);
      }


}