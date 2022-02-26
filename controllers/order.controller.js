const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');
var ObjectId = require('mongodb').ObjectID;

//checkout the order
exports.postOrder =  async (req, res, next) => {

         console.log('POSTORDER :');
         console.log(req.session.loggedin);
        if (!req.session.loggedin) {
            let error = 'Please login into your account.';
            return res.render('errorView', {title: 'Error Page', error});
        }

        let cart = req.session.cart;
        
        console.log('POSTORDER:');
        console.log(cart);

        if (!cart) {
            let error = 'No item in the shopping cart';
            return res.render('errorView', {title: 'Error Page', error});
        }
         

            try {
                var outOfStockProd=[];
               // console.log(cart);
             //   for (const element of cart.items) {   //for array looping
                for (const [key, value] of Object.entries(cart.items)) {
                   let product = await Product.findOne({_id:key});
                   if (product.quantity < value.quantity ) {
                     // let outOfStockProd = { productName: product.name, productQty: product.quantity};
                       outOfStockProd.push(product.name);
                   }
                } 
            } catch (err) {
                console.log("Error retrieving the product : %s ", err);
                console.error(err);
            }

            if (outOfStockProd.length > 0) {
                console.log(outOfStockProd);
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
    
                    console.log("Order ready to add to the DB");    
                    console.log(order);
                    //order.orderList = cart;
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
                   let error = "order.controller.postOrder : Problem in saving the order to the database";
                   res.render(error);
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
               //console.log("Order : "+orders.orderList[0].date);   
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
               return res.render('errorView', {title: 'Error Page', type:'msg', error: error});
            }
      } catch (err) {
                let error = 'order.controller.getOrders : Error selectin order : %s '+err;
                return res.render('errorView', {title: 'Error Page', type: 'err', error});
      }
}

//Get all the order items for the order for the user
exports.getOrderHistory =  async (req, res, next) => {

    try {
            const orderId = req.params.orderid;
            console.log("ORDERID : "+orderId);
           // const order = await Order.findOne({userid:req.session.userid});
           //New skin
           const order = await Order.findOne({orderid: orderId});
           
           
            if (order) { 
               const items = order.items;

                  var totalQuantity = order.totalQuantity;
                 var total = order.total;
                 var itemList=[];
                 for (const [key, value] of Object.entries(items)) {
                    itemList.push(value);
                    console.log(value);
                }
            
               res.render('orderhistoryView', {title:"Order History Page", orderId:orderId, items:itemList, totalQty: totalQuantity, total:total, shoppingCartPage:true});
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


exports.removeItem =  async (req, res, next) => {

    let cart = new ShoppingCart(req.session.cart);
    try {
       // const product = await Product.findById(req.params.id);

            let action = req.params.action;
            cart.remove(req.params.productId);
            req.session.cart = cart;
            res.redirect('/home/shopping-cart/'+action);
        } catch (err) {
            console.log("Error remove the item from the cart : %s ", err);
            console.error(err);
        }

}


exports.updateOrder =  async (req, res, next) => {


        /** 
        if (!req.session.loggedin) {
            let error = 'Please login into your account.';
            return res.render('errorView', {title: 'Error Page', error});
        }
        **/

        let cart = req.session.cart;

        console.log('Update Order:'); 
        console.log(cart);
        
        if (!cart)
          return res.render('No item in shopping cart!');

        try {
               var oldOrder = await Order.findOne({orderid: cart.orderId});

           // console.log (oldOrder._id);
          //  console.log (cart.orderId);
           
            if (!oldOrder) {
                let error = 'order.controller.updateOrder: No order found!';
                return res.render('errorView', error);
            }

           // let customerOrder = userOrder.orderList.find(orderlist => orderlist.orderId == cart.orderId); 
           // let orderListIndex = userOrder.orderList.findIndex(orderlist => orderlist.orderId == cart.orderId);
            
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
            console.log("order.controller.updateOrder : Error retrieving the user order : %s ", err);
            console.error(err);
        }

            try {
                var outOfStockProd=[];
               // console.log(cart);
             //   for (const element of cart.items) {   //for array looping
                for (const [key, value] of Object.entries(cart.items)) {
                   let product = await Product.findOne({_id:key});
                   if (product.quantity < value.quantity ) {
                     // let outOfStockProd = { productName: product.name, productQty: product.quantity};
                       outOfStockProd.push(product.name);
                   }
                } //for
            } catch (err) {
                console.log("order.controller.updateOrder : Error retrieving the product : %s ", err);
                console.error(err);
            }

            if (outOfStockProd.length > 0) {

                for (const [key, value] of Object.entries(oldOrder.items)) {
                    var product = await Product.findOne({_id:key});
                    product.quantity -=value.quantity;
                    const editProductQty = await product.save();
                }
                cart={};
                req.session.cart={};
                console.log(outOfStockProd);
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
                        
                       // order.orderList.push(cart);
                        //remove the old order from db 
                        oldOrder.remove();
                          console.log('Order Update : '+order);
                        //Add the updated order
                        const savedNewOrder = await order.save();

                        for (const [key, value] of Object.entries(cart.items)) {
                            let product = await Product.findOne({_id:key});
                            product.quantity -= value.quantity;
                            const editProductQty = await product.save();
                        } //for 

                        
                            cart={};
                            req.session.cart={};
                            console.log('UpdateOrder: ');
                            console.log(req.session.cart);
                           // console.log(typeof req.sessoion.cart);
                            res.render('admincheckoutView', 
                                    {title:"Checkout page", msg:'Your checkout is completed.', admin: true});
                    } catch (err) {
                        console.log("order.controller.updateOrder : Error retrieving the product : %s ", err);
                        console.error(err);
                    }

                } //else   
}
    

exports.cancelOrder = async (req , res , next) => {

    req.session.cart = {};
    cart={};
    res.redirect('/home');

}

