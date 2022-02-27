const SweetBakeryDB = require('../models/sweetbakeryDB.model');
const {User, Product, Order} = SweetBakeryDB.getModel();

exports.login =  async (req, res, next) => {

        try {
            res.render('loginView', {title:"User login",});
        } catch (err) {
            let error = "Error rendering to the user login page : %s "+err;
            return res.render('errorView', {title: 'Error Page', type:'msg', error: error});
        }  

}

exports.logout =  async (req, res, next) => {

        if (req.session.loggedin) {
            req.session.destroy((err) => {
                if (err) {
                    let error = "Error to logout : %s "+err;
                    return res.render('errorView', {title: 'Error Page', type:'error', error: error});
                }
                res.redirect('/');
            });
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
                    if (user.password === password){
                        
                        req.session.loggedin = true;
                        req.session.username = user.username;
                        req.session.loginid = user._id;
                        req.session.userid = user._id;

                        if (user.type === 'admin'){
                            req.session.usertype = 'admin';
                            res.redirect('/home/products');
                        }
                        else {
                            req.session.usertype = 'user';
                            res.render('indexView', {title:"Home Page"});
                        }
                           
                    } else {
                        let error = "Incorrect Password!";
                        return res.render('errorView', {title: 'Error Page', type:'msg', error: error});
                    }
                } else {
                    let error = "Incorrect Username!";
                    return res.render('errorView', {title: 'Error Page', type:'msg', error: error});
                }
            } else {
                let error = 'Please enter Username and Password';
                return res.render('errorView', {title: 'Error Page', type:'msg', error: error});
            }
           
        } catch (err) {
            let error = "Error rendering to the user login page : %s"+err;
            return res.render('errorView', {title: 'Error Page', type:'msg', error: error});
        }
    } catch(err) {
        let error = "Error selecting : %s"+err;
        return res.render('errorView', {title: 'Error Page', type:'msg', error: error});
    }      

}


exports.roles = function hasRole(roles) {
    return async function(req, res, next) {
      const user = await User.findOne({ _id: req.session.loginid }) ;
      if (!user || !roles.includes(user.type)) {
        return res.status(403).send({error: { status:403, message:'Access denied.'}});
      }
      next();
    }
  }

