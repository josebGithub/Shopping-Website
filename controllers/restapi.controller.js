const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

//Get products matching the specific name
exports.getAllProducts =  async (req, res, next) => {

    try {

        let products = await Product.find({}).sort({_id:1});

        if (products.length == 0) {
            let error = 'No products found!';
            return res.render('errorView', {title : 'Error Page', error});
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


            const accept=req.accepts(['html','json','xml']);
                 res.format({
                    'application/json': () => {
                         res.json(results);
                     }
                    });

    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 };


 //Get products matching the specific name
exports.getProductByName =  async (req, res, next) => {

    try {

        let pName = req.params.name
        console.log(pName);
        let productName = pName.replace('_',' ');
        console.log(productName);
        let product = await Product.findOne({name: productName});

        if (!product) {
            let error = 'No products found!';
            return res.render('errorView', {title : 'Error Page', error});
        }

            const accept=req.accepts(['html','json','xml']);
                 res.format({
                    'application/json': () => {
                         res.json(product);
                     }
                    });
            

    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 };



//Get product within the specfified price range
exports.getProductsByPriceRange =  async (req, res, next) => {

    try {

        let price1 = req.params.price1;
        let price2 = req.params.price2;
        let products = await Product.find({price:{$gte:price1, $lte:price2}}).sort({price:1});;

        if (products.length == 0) {
            let error = 'No products found!';
            return res.render('errorView', {title : 'Error Page', error});
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


            const accept=req.accepts(['html','json','xml']);
                 res.format({
                    'application/json': () => {
                         res.json(results);
                     }
                    });

    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 
 
 };
 
 
 
 
 
 