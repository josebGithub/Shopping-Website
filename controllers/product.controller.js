const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

exports.getProductList = async (req, res, next) => {

    try {

        let products = await Product.find({});

        if (!products) {
            let error = 'No products found!';
            return res.render('errorView', {title : 'Error Page', error});
        }

        try {
            let results = products.map( product => {
                return {
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    type: product.type,
                    image: product.image
                }
            });

            res.render('productsView', 
                {title:"Product List Page",
                 data:results, admin: true});
        } catch (err) {
                console.log("Error rendering to the Products Page : %s ", err);
                console.error(err);
        }
    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 
 };

  exports.getProductsDisplay = async (req, res, next) => {

   
    try {

        let products = await Product.find({type: req.params.type});

        if (!products) {
            let error = 'No products found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
           

        try {
            let results = products.map( product => {
                return {
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    type: product.type,
                    image: product.image
                }
            });

            res.render('productsdisplayView', 
                {title:"Display Products Page",
                 data:results});
        } catch (err) {
                console.log("Error rendering to the product Page : %s ", err);
                console.error(err);
        }
    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 
 };
 
 exports.addProducts = async (req, res, next) => {

   
    try {

        let products = await Product.find({type: req.params.type});

        if (!products) {
            let error = 'No products found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
           

        try {
            let results = products.map( product => {
                return {
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    type: product.type,
                    image: product.image
                }
            });

            res.render('productsdisplayView', 
                {title:"Display Products Page",
                 data:results});
        } catch (err) {
                console.log("Error rendering to the product Page : %s ", err);
                console.error(err);
        }
    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 
 };
 
 
 