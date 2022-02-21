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
            //Check the stocks in product collection
            try {
                var outOfStockProd=[];
                console.log(cart);
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
            console.log("ORDERID : "+orderId);
            const order = await Order.findOne({userid:'user0001'});
           
           
            if (order) { 
               const orderList = order.orderList;

               for (const element of orderList) {
                  if (element.orderId == orderId) {
                     var totalQuantity = element.totalQuantity;
                     var total = element.total;
                     var items=[];
                     for (const [key, value] of Object.entries(element.items)) {
                            items.push(value);
                            console.log(value);

                     }
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
    console.log("CART : ");
    console.log(cart);
    console.log(req.session.cart);

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