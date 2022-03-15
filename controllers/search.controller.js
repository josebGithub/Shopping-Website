const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

//Get products matching the specific name
exports.getAllProducts =  async (req, res, next) => {

    try {

        let products = await Product.find({}).sort({_id:1});

        if (products.length == 0) {
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
                        res.render('productsdisplayView', 
                        {title:"Display Products Page",
                         data:results});
                    },

                    'application/json': () => {
                         res.json(results);
                     }
                    });


    } catch (err) {
        let error = "Error selecting the products : %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
    }
 };


 //Get products matching the specific name
exports.getProductByName =  async (req, res, next) => {

    try {

        let pName = req.params.name
        let productName = pName.replace('_',' ');

        let product = await Product.findOne( {name:{'$regex': productName, $options:"$i"}});

        if (!product) {
                let error = "No products found!";
                return res.render('errorView', {title : 'Error Page', type: 'msg', error});
        }


            const accept=req.accepts(['html','json']);
                 res.format({
                    'text/html' : () => {
                        res.type('text/html');
                        res.render('productsdisplayView', 
                        {title:"Display Products Page",
                         data:product});
                    },
                    
                    'application/json': () => {
                         res.json(product);
                     }
                    });
            

    } catch (err) {
        let error = "Error selecting the products: %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'err', error}); 
    }
 };



//Get product within the specfified price range
exports.getProductsByPriceRange =  async (req, res, next) => {

    try {

        let priceMin = req.query.minprice || req.params.minprice;
        let priceMax = req.query.maxprice || req.params.maxprice;
       
        let products = await Product.find({price:{$gte:priceMin, $lte:priceMax}}).sort({price:1});

        if (products.length == 0) {
            let error = "No products found!";
            return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
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
                        res.render('productsdisplayView', 
                        {title:"Display Products Page",
                         data:results});
                    },

                    'application/json': () => {
                         res.json(results);
                     }
                    });

    } catch (err) {
        let error = "Error selecting the products : %s "+err;
        return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
    }
 
 
 };
 
 
 
 //Allow user to search for the products by product name or product type on the website
exports.searchProductsByNameOrType = async (req, res, next) => {

   
        let searchText = req.query.search;

    try {

       //Search at two fields, 'name' and 'type' from the Product
            var products = await Product.find({$or:
               [
                   {name:{'$regex': searchText, $options:"$i"}},
                   {type:{'$regex': searchText, $options:"$i"}}
                ]
            });
       

         if (products.length == 0) {
            let error = "No products found!";
            return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
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
            let error = "Error rendering to the product display Page : "+err;
            return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
        }
         
       
     } catch (err) {
          let error = "Error selecting the products from product collection: "+err;
          return res.render('errorView', {title : 'Error Page', type: 'msg', error}); 
     }
 
 };


  
 
 