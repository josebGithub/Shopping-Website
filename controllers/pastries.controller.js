const SweetBakeryDB = require('../models/sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

module.exports = async (req, res, next) => {

   
    try {
        let pastries = await Product.find({type:"pastry"});

        if (!pastries)
            return res.render('404View');

        try {
            console.log("Call pastriesView");
            let results = pastries.map( pastry => {
                return {
                    id: pastry.id,
                    sku: pastry.sku,
                    name: pastry.name,
                    description: pastry.description,
                    price: pastry.price,
                    quantity: pastry.quantity,
                    type: pastry.type,
                    image: pastry.image
                }
            });

            res.render('pastriesView', 
                {title:"Display Pastries Page",
                 data:results});
        } catch (err) {
                console.log("Error rendering to the Pastries Page : %s ", err);
                console.error(err);
        }
    } catch (err) {
         console.log("Error selecting : %s ", err);
         console.error(err);
    }
 
 };
 