const e = require('express');
const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

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
            let order = await Order.findOne({userid:req.params.id});
        
            if (!order) {
                let error = 'No customer order found!';
                return res.render('errorView', {title : 'Error Page', error});
            }

                res.render('customerOrderListView', 
                {title:"Customer Order List Page",
                 customerid: order.userid, customername: order.customerName, data: order.orderList, admin: true});
       
        } catch (err) {
         console.log("Error selecting User collection: %s ", err);
         console.error(err);
        }
 
 };

 /** 
 exports.getCustomerOrder = async (req, res, next) => {

    try {
            let orders = await Order.find({userid:req.params.id}).sort({date:-1});
        
            if (!orders) {
                let error = 'No customer order found!';
                return res.render('errorView', {title : 'Error Page', error});
            }

            try {
                let results = orders.map( customerOrder => {
                    return {
                        customerid: customerOrder.userid,
                        customername: customerOrder.customerName,
                        orderList: customerOrder.orderList
                    }
                });

                res.render('customerOrdersView', 
                {title:"Customer Order List Page",
                 data: results, admin: true});

            } catch (err) {
                console.log("Error selecting Order collection : %s ", err);
                console.error(err);
            }

            res.render('customersView', 
                {title:"Customer List Page",
                 data: customers, admin: true});
       
        } catch (err) {
         console.log("Error selecting User collection: %s ", err);
         console.error(err);
        }
 
 };
**/

 exports.editOrder = async (req, res, next) => {

    try {

        let userID = req.params.userid;
        let orderID = req.params.orderid;
        const order = await Order.findOne({userid: userID});
        
        if (!order) {
            let error = 'No orders are found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
        try {

            if (order) { 
                const orderList = order.orderList;
 
                for (const element of orderList) {
                   if (element.orderId == orderID) {
                      var totalQuantity = element.totalQuantity;
                      var orderDate = element.date;
                      var total = element.total;
                      var items=[];
                      for (const [key, value] of Object.entries(element.items)) {
                             items.push(value);
                             console.log(value);
 
                      }
                   }
                }
            }
            res.render('orderItemsView', {title:"Edit Customer Order"
             ,userid: userID, orderid:orderID, orderdate: orderDate, items:items, totalQty: totalQuantity, total:total});
        } catch (err) {
            console.log("Error rendering to the order item list form : %s ", err);
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

        const order = await Order.findOne({userid: userID});
        
        if (!order) {
            let error = 'No orders are found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
        try {

            if (order) { 
                const orderList = order.orderList;
 
                for (const element of orderList) {
                   if (element.orderId == orderID) {
                      var totalQuantity = element.totalQuantity;
                      var orderDate = element.date;
                      var total = element.total;
                      var item = element.items[itemID]
                   }
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

