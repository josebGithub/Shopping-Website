const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();
const ShoppingCart = require('../models/cart.model');
const { redirect } = require('express/lib/response');
var ObjectId = require('mongodb').ObjectID;

//checkout the order
exports.postOrder =  async (req, res, next) => {

    try {

        if (!req.session.loggedin) {
            let error = 'Please login into your account.';
            return res.render('errorView', {title: 'Error Page', error});
        }
        let cart = req.session.cart;
        
        console.log(cart);

        if (!cart)
          return res.render('No item in shopping cart!');

        try {
           // const userOrder = await Order.findOne({userid: req.session.userid});
            //If findOne(), return an obj, check obj, !userOrder
            //If find(), return an array , check array, userOrder.length==0
         
            // newscheme if (!userOrder) {
                //console.log("New Order");
                
            //}
            //else {
               // console.log("Add cart to order");
            //    userOrder.orderList.push(cart);
            ///    const savedOrder = await userOrder.save();
           // }
            //Cart.clearCart(cart, req.session.cart);
            //Check the stocks in product collection
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
                       
                let userid = req.session.userid;
                let orderid = cart.orderId;
                let orderdate = cart.date;
                let customerName = req.session.username;
                let order = new Order ({ 
                            orderid: orderid,
                            userid: userid,
                            orderdate: orderdate,
                            customerName: customerName,
                            orderList: cart
                        });
    
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
                   }
           
        } catch (err){
            console.log("Error adding the order : %s ", err);
            console.error(err);
        }
       
        // If the same user, then add the cart to orderList
      } catch (err) {
          console.log("Error selecting order : %s ", err);
          console.error(err);
      }
}

//get all orders for the user and list the orders for the user
exports.getOrders =  async (req, res, next) => {

    try {
            const orders = await Order.findOne({userid: req.session.userid});
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

//Get all the order items for the order for the user
exports.getOrderHistory =  async (req, res, next) => {

    try {
            const orderId = req.params.orderid;
            console.log("ORDERID : "+orderId);
           // const order = await Order.findOne({userid:req.session.userid});
           //New skin
           const order = await Order.findOne({orderid: orderId});
           
           
            if (order) { 
               const orderList = order.orderList;

               /** 
               for (const element of orderList) {
                  if (element.orderId == orderId) {
                     var totalQuantity = element.totalQuantity;
                     var total = element.total;
                     var items=[];
                     for (const [key, value] of Object.entries(element.items)) {
                            items.push(value);
                            console.log(value);

                     }
                  }   */

                 
                    if (orderList.orderId == orderId) {
                       var totalQuantity = orderList.totalQuantity;
                       var total = orderList.total;
                       var items=[];
                       for (const [key, value] of Object.entries(orderList.items)) {
                              items.push(value);
                              console.log(value);
  
                       }
                    
               }
            
               res.render('orderhistoryView', {title:"Order History Page", orderId:orderId, items:items, totalQty: totalQuantity, total:total, shoppingCartPage:true});
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

            cart.remove(req.params.productId);
            req.session.cart = cart;
            res.redirect('/home/shopping-cart');
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
        
        if (!cart)
          return res.render('No item in shopping cart!');

        try {
            const oldOrder = await Order.findOne({orderid: cart.orderId});

           // console.log (oldOrder._id);
          //  console.log (cart.orderId);
           
            if (!oldOrder) {
                let error = 'order.controller.updateOrder: No order found!';
                res.render('errorView', error);
            }

           // let customerOrder = userOrder.orderList.find(orderlist => orderlist.orderId == cart.orderId); 
           // let orderListIndex = userOrder.orderList.findIndex(orderlist => orderlist.orderId == cart.orderId);
            
            // Update return inventory
            for (const [key, value] of Object.entries(oldOrder.orderList.items)) {
                var product = await Product.findOne({_id:key});
                product.quantity +=value.quantity;
                const editProductQty = await product.save();
            }
            
            var userid = oldOrder.userid;
            var orderid = oldOrder.orderid;
            var orderdate = oldOrder.orderdate;
            var customerName = oldOrder.customerName;

            //remove the old order from db 
            oldOrder.remove();

            //create a new order with the old orderid
            
          

               // cart={};
              //  req.session.cart={};
                
           // delete customerOrder.items;
            //customerOrder = cart;
            //userOrder.orderList[orderListIndex]=cart;
           

           // userOrder.update({"_id":userOrder._id},{"$pull":{"orderList":{orderId: "WPN-1645693764339"}}});
            //Order.update({"_id:":userOrder._id}, {$unset : {"orderList.0" : 1 }});
          //  Order.update({"_id:":ObjectId("621741dcd40da387489093c2")}, {$unset : {"orderList.0" : 1 }});
          //  Order.update({"_id:":ObjectId(userOrder._id)}, {$pull:{"orderList":null}});
           // const updateCustomerOrder = await userOrder.save();

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
                console.log(outOfStockProd);
                    res.render('checkoutView', 
                    {title:"Checkout page", msg:'Your checkout is not completed. The products don\'t have enough stocks, please remove it from your shopping cart:', outOfStockProd:outOfStockProd});
            } else { 
                    try {

                        let order = new Order ({ 
                            orderid: orderid,
                            userid: userid,
                            orderdate: orderdate,
                            customerName: customerName,
                            orderList: cart
                        });
            
                       // order.orderList.push(cart);
                        const savedNewOrder = await order.save();
                        for (const [key, value] of Object.entries(cart.items)) {
                            let product = await Product.findOne({_id:key});
                            product.quantity -= value.quantity;
                            const editProductQty = await product.save();
                        } //for 
                            cart={};
                            req.session.cart={};
                            res.render('checkoutView', 
                                    {title:"Checkout page", msg:'Your checkout is completed.'});
                    } catch (err) {
                        console.log("order.controller.updateOrder : Error retrieving the product : %s ", err);
                        console.error(err);
                    }

                } //else
        
}
    