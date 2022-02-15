module.exports = (req, res, next) => {

    /* Get HOME page. */
    try {
         res.render('pastriesView', {title:"Pastries Page"});
     } catch (err) {
         console.log("Error rendering to the Pastries Page : %s ", err);
         console.error(err);
     }
 
 };