const SweetBakeryDB = require('./sweetBakeryDB.model.js');

const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

//const {User, Product//} = SweetBakeryDB.getModel();

(async() => {

	await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    

	let user1 = new User({
	    username: 'user1',
	    password: 'user1pwd',
        email: 'user1@test.com',
        address: '30 Terraced',
        type: 'user'
	}); 

    let user2 = new User({
	    username: 'user2',
	    password: 'user2pwd',
        email: 'user2@test.com',
        address: '30 Terraced',
        type: 'admin'
	}); 

    let product1 = new Product({
        sku: 'SKU110010',
        name: 'Croissant',
        description: 'Traditional Butter Croissant',
        price: 5.60,
        quantity: 1,
        type: 'pastry',
        image: 'croissant.png'
	}); 

    let product2 = new Product({
        sku: 'SKU110011',
        name: 'Chocolate Cake',
        description: 'Chocolate Cake',
        price: 6.80,
        quantity: 10,
        type: 'pastry',
        image: 'chocolatecake.png'
	}); 

	await Promise.all([
			user1.save(),
            user2.save(),
            product1.save(),
            product2.save()
		]);

	let currentUsers = await User.find({});

	console.log(currentUsers);



   

	process.exit();


})();






