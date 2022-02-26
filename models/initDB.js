
const SweetBakeryDB = require('./sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();


(async() => {

	await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    

	let user1 = new User({
	    username: 'user1',
	    password: 'user1pwd',
        firstname: 'user1Firstname',
        lastname: 'user1Lastname',
        email: 'user1@test.com',
        address: '15 Forever Road, Dublin CA, 95890',
        type: 'user'
	}); 

    let user2 = new User({
	    username: 'user2',
	    password: 'user2pwd',
        firstname: 'user2Firstname',
        lastname: 'user2Lastname',
        email: 'user2@test.com',
        address: '30 Tend Steet, San Jose CA, 92567',
        type: 'user'
	}); 

    let user3 = new User({
	    username: 'admin1',
	    password: 'admin1pwd',
        firstname: 'admin1Firstname',
        lastname: 'uadmin1Lastname',
        email: 'admin1@sweetbakery.com',
        address: '30 Terraced Circle, San Ramon CA, 94582',
        type: 'admin'
	}); 

    let product1Price = parseFloat(5.30);
    let product1 = new Product({
        sku: 'SKU110010',
        name: 'Croissant',
        description: 'Traditional Butter Croissant',
        price: product1Price,
        quantity: 10,
        type: 'pastries',
        image: 'croissant.png'
	}); 

    let product2Price = parseFloat(6.62);
    let product2 = new Product({
        sku: 'SKU110011',
        name: 'Chocolate Cake',
        description: 'Chocolate Cake',
        price: product2Price,
        quantity: 10,
        type: 'pastries',
        image: 'chocolatecake.png'
	}); 

	await Promise.all([
			user1.save(),
            user2.save(),
            user3.save(),
            product1.save(),
            product2.save()
		]);

	let currentUsers = await User.find({});


	//console.log(currentUsers);

	process.exit();

})();






