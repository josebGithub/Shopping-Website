const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();


//Get the list of the products from Product collection and render to productsView
//to display the list of products for admin
exports.getProductList = async (req, res, next) => {

    try {

        let products = await Product.find({});

        if (!products) {
            if (req.session.usertype === 'admin') {
                let error = "No products found!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error, admin:true}); 
            } else {
                let error = "No products found!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
            }
        }

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

                const accept=req.accepts(['html','json']);
                 res.format({
                    'text/html' : () => {
                         res.type('text/html');
                         res.render('productsView', 
                                {title:"Product List Page",
                                data:results, admin: true});
                        },
             
                    'application/json': () => {
                         res.json(results);
                     }
                    });

    } catch (err) {
        let error = "Error selecting products: %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }
 
 };


 //Get the products from the Product Collection based on the product type
 // and display the products by rendering to the productsdisplayView
  exports.getProductsDisplay = async (req, res, next) => {

   
    try {

        let products = await Product.find({type: req.params.type});

        if (!products) {
            if (req.session.usertype === 'admin') {
                let error = "No products found!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error, admin:true}); 
            } else {
                let error = "No products found!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
            }
           
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
                let error = "Error rendering to the product Page : %s "+err;
                return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }
    } catch (err) {
        let error = "Error selecting products: %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }
 
 };
 
 //Render to the addProductView to display the add product form
 exports.addProduct = async (req, res, next) => {

        try {
            res.render('addProductView', {title:"Add a new product", admin: true});
        } catch (err) {
            let error = "Error rendering to the add product form: %s"+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }
   
 };
 
 
 //Add a new product to the Product collection
exports.saveProduct = async (req , res , next) => {

    let product = new Product({
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        type: req.body.type,
        image: req.body.image
    }); 
  

        try {
            const savedProduct = await product.save();
            res.redirect('/home/products');
            //res.status(200).json(JSON.stringify(savedProduct));
        } catch (err) {
            let error = "product.controller.saveProduct : Cannot save the product to database %s"+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }
    
};

//Get the data from the Product collection, render to the editProductView 
//to  display the edit product form
exports.editProduct = async (req, res, next) => {

    try {

            const product = await Product.findById(req.params.id);

            if (!product) {
                let error = "This product is not found!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
            }
  
            try {
                res.render('editProductView',
                    {title:"Edit a Product",
                    data: { id: product._id,
                            sku: product.sku,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            quantity: product.quantity,
                            type: product.type,
                            image: product.image},
                            admin: true
                    });
            } catch (err) {
                let error = "Error rendering to the edit product form : %s "+err;
                return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
            } 
    } catch(err) {
          let error = "Error selecting products: %s "+err;
          return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }    

};

//Update the product and saved the update to the Product collection
exports.saveEditProduct = async (req , res , next) => {

  
    try {
        const product = await Product.findById(req.body.id);

        if (!product) {
            let error = "This product is not found!";
            return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
        }
  
        try {
             product.id = req.body._id;
             product.sku = req.body.sku;
             product.name = req.body.name;
             product.description = req.body.description;
             product.price = req.body.price;
             product.quantity = req.body.quantity;
             product.type = req.body.type;
             product.image = req.body.image
        
            const editProduct = await product.save();
            res.redirect('/home/products');
        } catch (err) {
            let error = "Error updating the product: %s  "+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }
    } catch(err) {
        let error = "Error selecting the products: %s   "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }    
  
};

//Get the data from the Product collection, render to the deleteProductView 
//to  display the delete product form
exports.deleteProduct = async (req, res, next) => {

  
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            let error = "This product is not found!";
            return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
        }
  
        try {
            res.render('deleteProductView',
            {title:"Delete a Product",
             data: { id: product._id,
                     sku: product.sku,
                     name: product.name,
                     description: product.description,
                     price: product.price,
                     quantity: product.quantity,
                     type: product.type,
                     image: product.image},
                     admin: true
             });
        } catch (err) {
            let error = "Error rendering to the delete product form : %s  "+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }
    } catch(err) {
        let error = "Error selecting the products : %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }      
  
};


//Delete the product from the Product collection and then redirect the admin back to the product list
exports.saveDeleteProduct = async (req , res , next) => {


    try {
        const product = await Product.findById(req.body.id);

        if (!product) {
            let error = "This product is not found!";
            return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
        }
  
        try {
            const removeProduct = await product.remove();
            res.redirect('/home/products');
        } catch (err) {
            let error = "Error updating the product: %s  "+err;
            return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
        }
    } catch(err) {
        let error = "Error selecting the products: %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }   

};

