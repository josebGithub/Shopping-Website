


module.exports = function ShoppingCart(existCart)  {

 
   this.totalQuantity = existCart.totalQuantity || 0;
   this.total = existCart.total || 0;
   this.items = existCart.items || {};

    this.add = (item , id, quantity) => {
        console.log("Calling add...");
        console.log("this.items : "+this.items);
       
        if (!this.items[id]) {
            this.items[id] = item;
            this.items[id].quantity=quantity;
           // this.items[id].total=this.item[id].quantity*this.item[id].price;
            this.totalQuantity +=quantity;
            this.total += quantity * this.items[id].price;
        } else {
            this.items[id].quantity+=quantity;
          //  this.items[id].total=this.item[id].quantity*this.item[id].price;
            this.totalQuantity +=quantity;
            this.total += quantity * this.items[id].price;
        }
    }
};
