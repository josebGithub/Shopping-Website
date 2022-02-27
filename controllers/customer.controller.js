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
            let error = "customer.controller.getCustomerList: Error selecting User collection: %s "+err;
            return res.render('errorView', {title: 'Error Page', type: 'err', error});
        }
 };


 exports.getCustomerOrderList = async (req, res, next) => {

    try {
          
           let order = await Order.find({userid:req.params.id}).sort({orderdate:-1});
        
            if (order.length == 0) {
                if (req.session.usertype === 'admin') {
                    let error = "No customer order found!";
                    return res.render('errorView', {title : 'Error Page', type: 'msg', error, admin:true}); 
                } else {
                    let error = "No customer order found!";
                    return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
                }
            }

            let results = order.map( userorder => {
                return {
                   date: userorder.orderdate,
                   orderid: userorder.orderid
                }
            });

                 res.render('customerOrderListView', 
                 {title:"Customer Order List Page",
                  customerid: order[0].userid, customername: order[0].customerName, data: results, admin: true});
       
        } catch (err) {
            let error = "customer.controller.getCustomerOrderList : Error selecting User collection: %s "+err;
            return res.render('errorView', {title: 'Error Page', type: 'err', error});
        }
 
 };


 exports.editOrder = async (req, res, next) => {

    try {

        let userID = req.params.userid;
        let orderID = req.params.orderid;

         const order = await Order.findOne({orderid: orderID});

        if (!order) {
            let error = 'No orders are found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
               // let customerOrder = order.orderList.find(orderlist => orderlist.orderId == orderID);
               var cart = new ShoppingCart(req.session.cart ? req.session.cart : {});

            if (typeof req.session.cart === 'undefined' || typeof req.session.cart.totalQuantity === 'undefined' || cart.orderId !=orderID){    

                if (cart.orderId !=orderID) {
                    cart=new ShoppingCart({});
                }
                for (const [key, value] of Object.entries(order.items)) {
                    cart.add(value.product, value.quantity);
                } 

                //cart.updateOrderId(orderID);
                cart.orderId = orderID;
                cart.userid = userID;
                req.session.cart = cart;
                req.session.userid = userID;

              } //if 
                
                res.render('shoppingcartView', {title:"Shopping Cart",
                        data: cart, userid: userID, action: 'update', shoppingCartPage:true, admin:true});
               
    } catch(err) {
        let error = "customer.controller.editOrder : Error selecting order : %s "+err;
        return res.render('errorView', {title: 'Error Page', type: 'err', error});
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
        let error = "order.controller.deleteOrder: Cannot remove order from database! "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error});
    }


}


exports.cancelEditOrder = async (req , res , next) => {

    req.session.cart = {};
    res.redirect('/home/customers');

}