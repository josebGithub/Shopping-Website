const req = require("express/lib/request");



module.exports = function ShoppingCart(existCart)  {
  //  exports.cart = function ShoppingCart(existCart) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var time = today.getTime();

    let todayWithFormat = mm + dd + yyyy;
    let orderId = "WPN-"+time;

    this.totalQuantity = existCart.totalQuantity || 0;
    this.total = existCart.total || 0;
    this.items = existCart.items || {};
    this.date = existCart.date || new Date();
    this.orderId = existCart.orderId || orderId;


    this.add = (product , quantity) => {
       
        let id = product.id;
        let price = parseFloat(product.price.toString());
        if (!this.items[id]) {
            this.items[id] = { product: {},
            quantity: 0,
            total: 0,
            };
            this.items[id].product = product;
        } 

            this.items[id].quantity+=quantity;
            this.items[id].total += quantity * price;
            this.totalQuantity +=quantity;
            this.total += quantity * price;
    }


    this.remove = function(id) {
        this.totalQuantity -= this.items[id].quantity;
        this.total -= this.items[id].quantity * this.items[id].product.price;
        delete this.items[id];
    }
};

/** 
exports.clearCart = (existCart, sessionCart) => {
    this.existCart = {};
    sessionCart={};
}
**/
