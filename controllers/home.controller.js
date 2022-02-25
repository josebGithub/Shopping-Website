const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

//Display home page
exports.displayHomePage = (req, res, next) => {

   /* Get HOME page. */
   try {
        res.render('indexView', {title:"Home Page"});
    } catch (err) {
        console.log("Error rendering to the Home Page : %s ", err);
        console.error(err);
    }

};



//Allow user to search for the product on the website
exports.search = async (req, res, next) => {

    let searchText = req.query.search;
    console.log(typeof searchText);
    console.log("searchText = "+searchText);

    if (searchText==null) {
        let error = "Please enter your products for search";
        return res.render('errorView', {title: 'Error Page', error});
    }

    try {

       //Search at two fields, 'name' and 'type' from the Product
       var products = await Product.find({$or:
               [
                   {name:{'$regex': searchText, $options:"$i"}},
                   {type:{'$regex': searchText, $options:"$i"}}
                ]
            });

         if (products.length == 0) {
             let error = "No products found";
             return res.render('errorView', {title: 'Error Page', error});
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

            console.log(results);

            res.render('productsdisplayView', 
                {title:"Display Products Page",
                 data:results});
        } catch (err) {
            let error = "Error rendering to the product display Page : "+err;
            return res.render('errorView', {title: 'Error Page', error});
        }
         
       
     } catch (err) {
            let error = "Error selecting the products from product collection: "+err;
            return res.render('errorView', {title: 'Error Page', error});
     }
 
 };


  