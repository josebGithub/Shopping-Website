const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();

exports.login =  async (req, res, next) => {

        try {
            res.render('loginView', {title:"User login",});
        } catch (err) {
            console.log("Error rendering to the user login page : %s ", err);
            console.error(err);
        }  

}

exports.userAuth = async (req, res, next) => {

    try {
        let username = req.body.username;
        let password = req.body.password;

       
  
        try {
            if (username && password) {
                const user = await User.findOne({username});
                if (user)
                {
                    if (user.password ===password){
                        req.session.loggedin = true;
                        req.session.username = user.username;
                        req.session.userid = user._id;

                        if (user.type == 'admin')
                            res.render('adminView', {title:"Admin Page", admin:true});
                        else 
                            res.render('indexView', {title:"Home Page"});
                    } else {
                        let error = 'Incorrect Password!';
                        return res.render('errorView', {title: "Error Page", error:error});
                    }
                } else {
                    let error = 'Incorrect Username!';
                    return res.render('errorView', {title: "Error Page", error:error});
                }
            } else {
                let error = 'Please enter Username and Password';
                res.render('errorView', {title: "Error Page", error:error});
            }
           
        } catch (err) {
            console.log("Error rendering to the user login page : %s ", err);
            console.error(err);
        }
    } catch(err) {
      console.log("Error selecting : %s ", err);
      console.error(err);
    }      

}