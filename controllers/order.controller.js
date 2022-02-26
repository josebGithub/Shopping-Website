const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');
var ObjectId = require('mongodb').ObjectID;

//checkout the order
exports.postOrder =  async (req, res, next) => {

        if (!req.session.loggedin) {
            let error = "Please login into your account.";
            return res.render('errorView', {title : 'Error Page', type: 'msg', error});
        }

        let cart = req.session.cart;

        if (!cart) {
            let error = "Empty shopping cart!";
            return res.render('errorView', {title : 'Error Page', type: 'err', error});
        }
         

            try {
                var outOfStockProd=[];
             
                for (const [key, value] of Object.entries(cart.items)) {
                   let product = await Product.findOne({_id:key});
                   if (product.quantity < value.quantity ) {
                       outOfStockProd.push(product.name);
                   }
                } 
            } catch (err) {
                let error = "order.controller.postOrder: Error retrieving the product : %s";
                return res.render('errorView', {title : 'Error Page', type: 'err', error});
            }

            if (outOfStockProd.length > 0) {
                    res.render('checkoutView', 
                    {title:"Checkout page", msg:'Your checkout is not completed. The products don\'t have enough stocks, please remove it from your shopping cart:', outOfStockProd:outOfStockProd});
            } else {
                       
               try {
                    let userid = req.session.userid;
                    let orderid = cart.orderId;
                    let orderdate = cart.date;
                    let customerName = req.session.username;
                    let totalQuantity = cart.totalQuantity;
                    let total = cart.total;
                    let order = new Order ({ 
                            totalQuantity : totalQuantity,
                            total : total,
                            orderid: orderid,
                            userid: userid,
                            orderdate: orderdate,
                            customerName: customerName,
                            items: cart.items
                        });
                  
                    const savedOrder = await order.save();

                        for (const [key, value] of Object.entries(cart.items)) {
                            let product = await Product.findOne({_id:key});
                            product.quantity -= value.quantity;
                            const editProductQty = await product.save();
                        }
                            cart={};
                            req.session.cart={};
                            res.render('checkoutView', 
                                    {title:"Checkout page", msg:'Your checkout is completed.'});
               } catch (err) {
                    let error = "order.controller.postOrder : Problem in saving the order to the database : %s"+err;
                    return res.render('errorView', {title : 'Error Page', type: 'err', error});
               }
            } //else
           
}

//get all orders for the user and list the orders for the user
exports.getOrders =  async (req, res, next) => {

    try {
            const orders = await Order.find({userid: req.session.userid}).sort({orderdate:-1});
            //If findOne(), return an obj, check obj, !userOrder
            //If find(), return an array , check array, userOrder.length==0

            if (orders.length > 0) {
             
               let results = orders.map( order => {
                return {
                   orderid : order.orderid,
                    orderdate : order.orderdate
                }
                });
               res.render('orderlistView', {title:"Order List Page", data: results});
            }
            else {
                let error = "You don't have any orders!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error});
            }
      } catch (err) {
                let error = "order.controller.getOrders : Error selectin order : %s "+err;
                return res.render('errorView', {title : 'Error Page', type: 'err', error});
      }
}

//Get all the order items for the order for the user
exports.getOrderHistory =  async (req, res, next) => {

    try {
            const orderId = req.params.orderid;
          
           const order = await Order.findOne({orderid: orderId});
           
           
            if (order) { 
               const items = order.items;

                  var totalQuantity = order.totalQuantity;
                 var total = order.total;
                 var itemList=[];
                 for (const [key, value] of Object.entries(items)) {
                    itemList.push(value);
                }
            
               res.render('orderhistoryView', {title:"Order History Page", orderId:orderId, items:itemList, totalQty: totalQuantity, total:total, shoppingCartPage:true});
            }
            else {
                let error = "You don't have any orders!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
            }
      } catch (err) {
            let error = "Error selecting order : %s "+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
      }


}


exports.removeItem =  async (req, res, next) => {

    let cart = new ShoppingCart(req.session.cart);
    try {
       // const product = await Product.findById(req.params.id);

            let action = req.params.action;
            cart.remove(req.params.productId);
            req.session.cart = cart;
            res.redirect('/home/shopping-cart/'+action);
        } catch (err) {
            let error = "Error remove the item from the cart : %s  "+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }

}


exports.updateOrder =  async (req, res, next) => {

        let cart = req.session.cart;
        
        if (!cart)
          return res.render('No item in shopping cart!');

        try {
               var oldOrder = await Order.findOne({orderid: cart.orderId});
           
            if (!oldOrder) {
                let error = "No order found!  ";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
            }
            
            // Update return inventory
            for (const [key, value] of Object.entries(oldOrder.items)) {
                var product = await Product.findOne({_id:key});
                product.quantity +=value.quantity;
                const editProductQty = await product.save();
            }
            
            var userid = oldOrder.userid;
            var orderid = oldOrder.orderid;
            var orderdate = oldOrder.orderdate;
            var customerName = oldOrder.customerName;
            var totalQuantity = cart.totalQuantity;
            var total = cart.total;

        } catch (err) {
            let error = "order.controller.updateOrder : Error retrieving the user order : %s"+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }

            try {
                var outOfStockProd=[];
             
                for (const [key, value] of Object.entries(cart.items)) {
                   let product = await Product.findOne({_id:key});
                   if (product.quantity < value.quantity ) {
                       outOfStockProd.push(product.name);
                   }
                } //for
            } catch (err) {
                let error = "order.controller.updateOrder : Error retrieving the product : %s "+err;
                return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
            }

            if (outOfStockProd.length > 0) {

                for (const [key, value] of Object.entries(oldOrder.items)) {
                    var product = await Product.findOne({_id:key});
                    product.quantity -=value.quantity;
                    const editProductQty = await product.save();
                }
                cart={};
                req.session.cart={};
                    res.render('admincheckoutView', 
                    {title:"Checkout page", msg:'Your checkout is not completed. The products don\'t have enough stocks, please remove it from your shopping cart:', outOfStockProd:outOfStockProd, admin: true});
            } else { 
                    try {

                        let order = new Order ({ 
                                totalQuantity : totalQuantity,
                                total : total,
                                orderid: orderid,
                                userid: userid,
                                orderdate: orderdate,
                                customerName: customerName,
                                items: cart.items
                            });
                        
                        //remove the old order from db 
                        oldOrder.remove();

                        //Add the updated order
                        const savedNewOrder = await order.save();

                        for (const [key, value] of Object.entries(cart.items)) {
                            let product = await Product.findOne({_id:key});
                            product.quantity -= value.quantity;
                            const editProductQty = await product.save();
                        } //for 

                        
                            cart={};
                            req.session.cart={};

                            res.render('admincheckoutView', 
                                    {title:"Checkout page", msg:'Your checkout is completed.', admin: true});
                    } catch (err) {
                        let error = "order.controller.updateOrder : Error retrieving the product : %s "+err;
                        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
                    }

                } //else   
}
    

exports.cancelOrder = async (req , res , next) => {

    req.session.cart = {};
    cart={};
    res.redirect('/home');

}

