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

            console.log('getProductList : '+req.session.usertype);
        
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
                let error = "Error rendering to the Products Page : %s"+err;
                return res.render('errorView', {title: 'Error Page', type:'err', error: error});
        }
    } catch (err) {
        let error = "Error selecting : %s "+err;
        return res.render('errorView', {title: 'Error Page', type:'err', error: error});
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
 
 exports.addProduct = async (req, res, next) => {

   
        console.log('authorize to access admin page');
        try {
            res.render('addProductView', {title:"Add a new product", admin: true});
        } catch (err) {
            console.log("Error rendering to the add product form: %s ", err);
            console.error(err);
        }
   
 };
 
 
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
            //res.status(200).json(JSON.stringify(savedEmployee));
        } catch (err) {
            let error = "product.controller.saveProduct : Cannot save the product to database";
            return res.render('errorView', {title: 'Error Page', type:'err', error: error});
        }
    
};

exports.editProduct = async (req, res, next) => {

    try {

            const product = await Product.findById(req.params.id);

            if (!product) {
                let error = 'This product is not found!';
                return res.render('errorView', {title : 'Error Page', error});
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
                    return res.render('errorView', {title: 'Error Page', type:'err', error: error});
            } 
    } catch(err) {
        let error = "Error selecting : %s "+err;
        return res.render('errorView', {title: 'Error Page', type:'err', error: error});
    }    

};


exports.saveEditProduct = async (req , res , next) => {

  
    try {
        const product = await Product.findById(req.body.id);

        if (!product) {
            let error = 'This product is not found!';
            return res.render('errorView', {title : 'Error Page', error});
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
            return res.render('errorView', {title: 'Error Page', type:'err', error: error});
        }
    } catch(err) {
        let error = "Error selecting : %s   "+err;
        return res.render('errorView', {title: 'Error Page', type:'err', error: error});
    }    
  
};

exports.deleteProduct = async (req, res, next) => {

  
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            let error = 'This product is not found!';
            return res.render('errorView', {title : 'Error Page', error});
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
            return res.render('errorView', {title: 'Error Page', type:'err', error: error});
        }
    } catch(err) {
        let error = "Error selecting : %s "+err;
        return res.render('errorView', {title: 'Error Page', type:'err', error: error});
    }      
  
};


exports.saveDeleteProduct = async (req , res , next) => {


    try {
        const product = await Product.findById(req.body.id);

        if (!product) {
            let error = 'This product is not found!';
            return res.render('errorView', {title : 'Error Page', error});
        }
  
        try {
            const removeProduct = await product.remove();
            res.redirect('/home/products');
        } catch (err) {
            let error = "Error updating the product: %s  "+err;
            return res.render('errorView', {title: 'Error Page', type:'err', error: error});
        }
    } catch(err) {
          let error = "Error selecting : %s "+err;
          return res.render('errorView', {title: 'Error Page', type:'err', error: error});
    }   

};

