var express = require('express');
var router = express.Router();

// other modules
var displayHomePage 	= require("./displayHomePage");
var displayPastriesPage   = require("./displayPastriesPage");
/** 
var addEmployee 		= require("./addEmployee");
var saveEmployee 		= require("./saveEmployee");
var editEmployee 		= require("./editEmployee");
var saveAfterEdit 	    = require("./saveAfterEdit");
var deleteEmployee 		= require("./deleteEmployee");
var deleteEmployeeAfterConfirm 	= require("./deleteEmployeeAfterConfirm");
*/

// router specs
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', 						displayHomePage);
router.get('/home/pastries', 			    displayPastriesPage);


/** 
router.get('/employees/add', 				addEmployee);
router.post('/employees/add', 			saveEmployee);

router.get('/employees/edit/:id', 	editEmployee);
router.post('/employees/edit/', 	saveAfterEdit);

router.get('/employees/delete/:id', deleteEmployee);
router.post('/employees/delete', deleteEmployeeAfterConfirm);
*/
module.exports = router;
