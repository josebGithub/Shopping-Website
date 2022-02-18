const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;
console.log('dbURL => '+dbUrl);

let connection = null;
let model = null;

//Fill in the schema definition
let Schema = mongoose.Schema;

//Create the schema and the collection
let userSchema = new Schema({
	username: { type:String, required:true },
	password: { type: String, required: true },
    email: { type: String, required: true },
    address: {type: String, required: true },
    type: { type: String, required: true }
}, {
	collection: 'user'
});

let productSchema = new Schema({
    sku: { type: String, required: true},
	name: { type: String, required: true },
	description: { type: String, required: true },
   // price: {type: mongoose.Types.Decimal128, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    type: {type: String, required:true},
    image: { type: String, required: true }
}, {
	collection: 'product'
});

/** 
let itemSchema = new Schema ({
    productId: {type: mongoose.Schema.Types.ObjectId, required:true},
    quantity: {type: Number, required: true,
            min: [1, "Quantity can not be less than 1"]},
    price: {type: mongoose.Types.Decimal128, required: true},
    total: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

let cardSchema = new Schema ({
    userId: {type: mongoose.Schema.Types.ObjectId, required:true},
    items: [itemSchema],
    subTotal: { default: 0, type: Number }
    },
    {
        timestamps: true
    }
);
*/

let orderSchema = new Schema({
    orderid: { type: String, required: true },
	userid: { type: Number, required: true },
	customerName: { type: String, required: true },
    orderList :  [{
        orderDate: Date,
        itemList: [{
            sku: String,
            name:String,
            description: String,
            quantity: Number,
            price: mongoose.Types.Decimal128
        }],
        total: mongoose.Types.Decimal128
   }]
}, {
	collection: 'orders'
});

let cartSchema = new Schema({
    //sessionid: { type: Number, required: true },
	quantity: {default: 0, type: Number, required: true},
	totalQuantity: {default: 0, type: Number, required: true},
    total: {default: 0, type: Number, required: true},
    //total: {default: 0, type: mongoose.Types.Decimal128, required: true},
    items:[]
}, {
	collection: 'cart'
});


// Getter
//inventorySchema.path('price').get(function(num) {
//    return (num / 100).toFixed(2);
//  });
  
  // Setter
//inventorySchema.path('price').set(function(num) {
//    return num * 100;
//  });

//const User = mongoose.model('user', userSchema);
//const Product = mongoose.model('product', productSchema);
//const Order = mongoose.model('order', orderSchema);
//const Cart = mongoose.model('cart', cartSchema);


module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			User = connection.model("UserModel", 
							userSchema);
            Product = connection.model("ProductModel", 
							productSchema);
            Order = connection.model("OrderModel", 
							orderSchema);
           // Cart = connection.model("CartModel", 
			//				cartSchema);

		};
		return {User, Product, Order};
	}
};
























