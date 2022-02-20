const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');


exports.postOrder =  async (req, res, next) => {

    try {
        let cart = req.session.cart;
        
        if (!cart)
          return res.render('No item in shopping cart!');

        try {
            const userOrder = await Order.findOne({userid:'user0001'});
            //If findOne(), return an obj, check obj, !userOrder
            //If find(), return an array , check array, userOrder.length==0
         
            if (!userOrder) {
                console.log("New Order");
                let userid = "user0001";
                let customerName = 'customer1';
                let order = new Order ({ 
                    userid: userid,
                    customerName: customerName,
                    orderList: []
                });
    
                order.orderList.push(cart);
                const savedOrder = await order.save();
            }
            else {
                console.log("Add cart to order");
                userOrder.orderList.push(cart);
                const savedOrder = await userOrder.save();
            }
            //Cart.clearCart(cart, req.session.cart);
            cart={};
            req.session.cart={};
            res.render('checkoutView', 
                {title:"Checkout page",
                 msg:'Your checkout is completed.'});
        } catch (err){
            console.log("Error updating the order : %s ", err);
            console.error(err);
        }
       
        // If the same user, then add the cart to orderList
      } catch (err) {
          console.log("Error selecting order : %s ", err);
          console.error(err);
      }
}


exports.getOrders =  async (req, res, next) => {

    try {
            const orders = await Order.findOne({userid:'user0001'});
            //If findOne(), return an obj, check obj, !userOrder
            //If find(), return an array , check array, userOrder.length==0
            
            if (orders) {
               //console.log("Order : "+orders.orderList[0].date);   
               res.render('orderlistView', {title:"Order List Page", data:orders.orderList});
            }
            else {
               console.log("No orders");
               res.render('You don\'t have any orders');
            }
      } catch (err) {
          console.log("Error selecting order : %s ", err);
          console.error(err);
      }
}


exports.getOrderHistory =  async (req, res, next) => {

    try {
            const orderId = req.params.orderid;
            const order = await Order.findOne({userid:'user0001'});
           
           
            if (order) { 
               const orderList = order.orderList;
               for (const element of orderList) {
                  if (element.orderId==orderId) {
                      var items = element.items;
                      var totalQuantity = element.totalQuantity;
                      var total = element.total;
                  }
              }
               res.render('orderhistoryView', {title:"Order History Page", orderList: orderList, items:items, totalQty: totalQuantity, total:total});
            }
            else {
               console.log("No orders");
               res.render('You don\'t have any orders');
            }
      } catch (err) {
          console.log("Error selecting order : %s ", err);
          console.error(err);
      }


}