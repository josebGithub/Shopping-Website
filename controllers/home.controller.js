module.exports = (req, res, next) => {

   /* Get HOME page. */
   try {
        res.render('indexView', {title:"Home Page"});
    } catch (err) {
        console.log("Error rendering to the Home Page : %s ", err);
        console.error(err);
    }

};


  