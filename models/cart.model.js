const req = require("express/lib/request");



module.exports = function ShoppingCart(existCart)  {

    const formatData = (input) => {
        if (input > 9) {
          return input;
        } else return `0${input}`;
      };

    const date = function() {
        let date = new Date();
        let dd = formatData(date.getDate());
        let mm = formatData(date.getMonth() + 1);
        let yyyy = date.getFullYear();
        let HH = formatData(date.getHours());
       // let hh = formatData(formatHour(date.getHours()));
        let MM = formatData(date.getMinutes());
        let SS = formatData(date.getSeconds());
         return mm+'-'+dd+'-'+yyyy+' '+HH+':'+MM+':'+SS;
     }

    let today = new Date();
    let time = today.getTime();
    //let todayWithFormat = mm + dd + yyyy;

    let orderId = "WPN-"+time;

    this.totalQuantity = existCart.totalQuantity || 0;
    this.total = existCart.total || 0;
    this.items = existCart.items || {};
    this.date = existCart.date || date();
    this.orderId = existCart.orderId || orderId;
    this.userid = existCart.userid || 0;


    this.add = (product , quantity) => {
       
        let id = product._id;
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

    this.update = (product , quantity) => {
       
        let id = product._id;
        let price = parseFloat(product.price.toString());
       
        let difference = quantity - this.items[id].quantity;
        
            this.items[id].quantity+=difference;
            this.items[id].total += difference * price;
            this.totalQuantity +=difference;
            this.total += difference * price;
    }
    

    this.remove = function(id) {
        this.totalQuantity -= this.items[id].quantity;
        this.total -= this.items[id].quantity * this.items[id].product.price;
        delete this.items[id];
    }

    this.updateOrderId = (orderId) => {
      
        this.orderId = orderId;
    }
    
    
    
    
};

/** 
exports.clearCart = (existCart, sessionCart) => {
    this.existCart = {};
    sessionCart={};
}
**/
