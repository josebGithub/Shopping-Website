const e = require('express');
const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');

exports.getCustomerList = async (req, res, next) => {

    try {
         
            let customers = await User.find({type: 'user'}).sort({_id:1});
        
            if (!customers) {
                let error = 'No customers found!';
                return res.render('errorView', {title : 'Error Page', error});
            }

            let results = customers.map( customer => {
                return {
                    id: customer._id,
                    username: customer.username,
                    firstname: customer.firstname,
                    lastname: customer.lastname,
                    email: customer.email,
                    address: customer.address
                }
            });

            res.render('customersView', 
                {title:"Customer List Page",
                 data: results, admin: true});
       
        } catch (err) {
         console.log("Error selecting User collection: %s ", err);
         console.error(err);
        }
 
 };


 exports.getCustomerOrderList = async (req, res, next) => {

    try {
            let order = await Order.find({userid:req.params.id});
        
            if (order.length == 0) {
                let error = 'No customer order found!';
                return res.render('errorView', {title : 'Error Page', error});
            }

            let results = order.map( userorder => {
                return {
                   date: userorder.orderdate,
                   orderid: userorder.orderid
                }
            });

           // console.log(order);
        //    console.log(results);

              //  res.render('customerOrderListView', 
           //     {title:"Customer Order List Page",
             //    customerid: order.userid, customername: order.customerName, data: order.orderList, admin: true});

                 res.render('customerOrderListView', 
                 {title:"Customer Order List Page",
                  customerid: order[0].userid, customername: order[0].customerName, data: results, admin: true});
       
        } catch (err) {
         console.log("Error selecting User collection: %s ", err);
         console.error(err);
        }
 
 };


 exports.editOrder = async (req, res, next) => {

    try {

        let userID = req.params.userid;
        let orderID = req.params.orderid;
       
        //const order = await Order.findOne({userid: userID});

         //new skin
         const order = await Order.findOne({orderid: orderID});


        if (!order) {
            let error = 'No orders are found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
        try {
               // let customerOrder = order.orderList.find(orderlist => orderlist.orderId == orderID);
                 
                let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});
                for (const [key, value] of Object.entries(order.orderList.items)) {
                    //let product = await Product.findOne({_id:key});

                    cart.add(value.product, value.quantity);
                }
                cart.updateOrderId(orderID);
                req.session.cart = cart;
                req.session.userid = userID;

                console.log(cart);
                
                res.render('shoppingcartView', {title:"Shopping Cart",
                        data: cart, userid: userID, action: 'update', shoppingCartPage:true});

        } catch (err) {
            console.log("Error selecting order list from order : %s ", err);
            console.error(err);
        } 
    } catch(err) {
      console.log("Error selecting : %s ", err);
      console.error(err);
    }      

};


exports.editItem = async (req , res , next) => {

    try {

        let userID = req.params.userid;
        let orderID = req.params.orderid;
        let itemID = req.params.itemid;

        const order = await Order.findOne({orderid: orderID});
        
        if (!order) {
            let error = 'No orders are found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
        try {
            if (order) { 
                const orderList = order.orderList;
    /** 
                for (const element of orderList) {
                   if (element.orderId == orderID) {
                      var totalQuantity = element.totalQuantity;
                      var orderDate = element.date;
                      var total = element.total;
                      var item = element.items[itemID]
                   }
                }
  */
              
                    if (orderList.orderId == orderID) {
                       var totalQuantity = orderList.totalQuantity;
                       var orderDate = orderList.date;
                       var total = orderList.total;
                       var item = orderList.items[itemID]
                    }
                 
            }


            res.render('editItemView', {title:"Edit item"
             ,userid: userID, orderid:orderID, orderdate: orderDate, itemid: itemID, item:item, totalQty: totalQuantity, total:total});
        } catch (err) {
            console.log("Error updating the product: %s ", err);
            console.error(err);
        }
    } catch(err) {
      console.log("Error selecting : %s ", err);
      console.error(err);
    }      
};


exports.editOrder = async (req, res, next) => {

    try {

        let userID = req.params.userid;
        let orderID = req.params.orderid;
       
        //const order = await Order.findOne({userid: userID});

         //new skin
         const order = await Order.findOne({orderid: orderID});


        if (!order) {
            let error = 'No orders are found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
        try {
               // let customerOrder = order.orderList.find(orderlist => orderlist.orderId == orderID);
                 
                let cart = new ShoppingCart(req.session.cart ? req.session.cart : {});
                for (const [key, value] of Object.entries(order.orderList.items)) {
                    //let product = await Product.findOne({_id:key});

                    cart.add(value.product, value.quantity);
                }
                cart.updateOrderId(orderID);
                req.session.cart = cart;
                req.session.userid = userID;

                console.log(cart);
                
                res.render('shoppingcartView', {title:"Shopping Cart",
                        data: cart, userid: userID, action: 'update', shoppingCartPage:true});

        } catch (err) {
            console.log("Error selecting order list from order : %s ", err);
            console.error(err);
        } 
    } catch(err) {
      console.log("Error selecting : %s ", err);
      console.error(err);
    }      

};


exports.editItem = async (req , res , next) => {

    try {

        let userID = req.params.userid;
        let orderID = req.params.orderid;
        let itemID = req.params.itemid;

        const order = await Order.findOne({orderid: orderID});
        
        if (!order) {
            let error = 'No orders are found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
        try {
            if (order) { 
                const orderList = order.orderList;
    /** 
                for (const element of orderList) {
                   if (element.orderId == orderID) {
                      var totalQuantity = element.totalQuantity;
                      var orderDate = element.date;
                      var total = element.total;
                      var item = element.items[itemID]
                   }
                }
  */
              
                    if (orderList.orderId == orderID) {
                       var totalQuantity = orderList.totalQuantity;
                       var orderDate = orderList.date;
                       var total = orderList.total;
                       var item = orderList.items[itemID]
                    }
                 
            }


            res.render('editItemView', {title:"Edit item"
             ,userid: userID, orderid:orderID, orderdate: orderDate, itemid: itemID, item:item, totalQty: totalQuantity, total:total});
        } catch (err) {
            console.log("Error updating the product: %s ", err);
            console.error(err);
        }
    } catch(err) {
      console.log("Error selecting : %s ", err);
      console.error(err);
    }      
};


exports.deleteOrder =  async (req, res, next) => {

    try {

        let orderid = req.params.orderid;
        let userid = req.params.userid;
        var oldOrder = await Order.findOne({orderid: orderid});

     if (!oldOrder) {
         let error = 'order.controller.deleteOrder: No order found!';
         res.render('errorView', error);
     }

    oldOrder.remove();
    res.redirect('/home/customer/'+userid);


    } catch (err) {
        let error = 'order.controller.deleteOrder: Cannot remove order from database!';
        res.render('errorView', error);
    }


}