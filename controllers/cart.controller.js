const SweetBakeryDB = require('../models/sweetBakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

module.exports = (req, res, next) => {
console.log("Call cart.controller.js...");

    if (!req.session.cart) {
        let cart = new Cart({
        sessionid: req.session.id,
	    status: 'active',
	    quantity: req.body.quantity,
        total: req.body.quantity * req.body.price,
        items:[{
                sku: req.params.sku,
                name: req.params.name,
                description: req.params.description,
                quantity: req.params.quantity,
                price: req.params.price,
            }],
        });

         console.log("items : "+req.body.sku);
 /**       let cart = new Cart({
            status: 'active',
            quantity: req.params.quantity,
            total: req.params.quantity*req.params.price,
            items:[{
                id: req.params.id,
                sku: req.params.sku,
                name:req.params.name,
                description: req.params.description,
                quantity: req.params.quantity,
                price: req.params.price
        }],
      }); */ 

      req.session.cart = cart;
    } else {
            req.session.cart.quantity += req.params.quantity;
            req.session.cart.items.push({
            id: req.params.id,
            sku: req.params.sku,
            name:req.params.name,
            description: req.params.description,
            quantity: req.params.quantity,
            price: req.params.price,
        })
    }

    try {
       // const savedCart = await cart.save();
        console.log("Cart : "+req.session.cart);
        res.redirect('/home/pastries')
       
    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 
 };
 