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



