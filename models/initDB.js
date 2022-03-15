
const SweetBakeryDB = require('./sweetbakeryDB.model.js');
const {User, Product, Order, Cart} = SweetBakeryDB.getModel();


(async() => {

	await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    

	let user1 = new User({
	    username: 'user1',
	    password: 'user1pwd',
        firstname: 'John',
        lastname: 'Crayon',
        email: 'johncrayon@test.com',
        address: '15 Forever Road, Dublin CA, 95890',
        type: 'user'
	}); 

    let user2 = new User({
	    username: 'user2',
	    password: 'user2pwd',
        firstname: 'Ann',
        lastname: 'Taylor',
        email: 'anntaylor@test.com',
        address: '30 Tend Steet, San Jose CA, 92567',
        type: 'user'
	}); 

    let user3 = new User({
	    username: 'admin1',
	    password: 'admin1pwd',
        firstname: 'Michael',
        lastname: 'Smith',
        email: 'admin1@sweetbakery.com',
        address: '30 Terraced Circle, San Ramon CA, 94582',
        type: 'admin'
	}); 

    let product1Price = parseFloat(5.50);
    let product1 = new Product({
        sku: 'SKU110010',
        name: 'Croissant',
        description: 'Traditional Butter Croissant',
        price: product1Price,
        quantity: 50,
        type: 'pastries',
        image: 'croissant.png'
	}); 

    let product2Price = parseFloat(6.30);
    let product2 = new Product({
        sku: 'SKU110011',
        name: 'Chocolate Cake',
        description: 'Chocolate Cake',
        price: product2Price,
        quantity: 30,
        type: 'pastries',
        image: 'chocolatecake.png'
	}); 

    let product3Price = parseFloat(3.00);
    let product3 = new Product({
        sku: 'SKU110012',
        name: 'Cheese Danish',
        description: 'Creamy Cheese Danish',
        price: product3Price,
        quantity: 30,
        type: 'pastries',
        image: 'cheesedanish.png'
	}); 

    let product4Price = parseFloat(2.00);
    let product4 = new Product({
        sku: 'SKU110013',
        name: 'Donut',
        description: 'Plain Donut',
        price: product3Price,
        quantity: 3,
        type: 'pastries',
        image: 'donut.png'
	}); 

    let product5Price = parseFloat(1.50);
    let product5 = new Product({
        sku: 'SKU110014',
        name: 'Butter Cookie',
        description: 'Light Butter Cookie',
        price: product3Price,
        quantity: 30,
        type: 'cookies',
        image: 'buttercookie.png'
	}); 

    let product6Price = parseFloat(2.00);
    let product6 = new Product({
        sku: 'SKU110015',
        name: 'Chocolate Cookie',
        description: 'Chocolate Chips Cookie',
        price: product3Price,
        quantity: 30,
        type: 'cookies',
        image: 'chocolatechipscookie.png'
	}); 

    let product7Price = parseFloat(2.00);
    let product7 = new Product({
        sku: 'SKU110016',
        name: 'Cheese Cake',
        description: 'Slice Cheese Cake',
        price: product3Price,
        quantity: 4,
        type: 'pastries',
        image: 'cheesecake.png'
	}); 


    let product8Price = parseFloat(10.00);
    let product8 = new Product({
        sku: 'SKU110017',
        name: 'Apple Pie',
        description: 'Red Apple Pie',
        price: product8Price,
        quantity: 50,
        type: 'pies',
        image: 'applepie.png'
	}); 

    let product9Price = parseFloat(2.00);
    let product9 = new Product({
        sku: 'SKU110018',
        name: 'Pumpkin Pie',
        description: 'Seasonal Pumpkin Pie',
        price: product9Price,
        quantity: 10,
        type: 'pies',
        image: 'pumpkinpie.png'
	}); 

    let product10Price = parseFloat(2.00);
    let product10 = new Product({
        sku: 'SKU110019',
        name: 'Red Velvet Cake',
        description: 'Raspberry V Cake',
        price: product3Price,
        quantity: 50,
        type: 'cakes',
        image: 'redvelvetcake.png'
	}); 

    let product11Price = parseFloat(2.00);
    let product11 = new Product({
        sku: 'SKU110020',
        name: 'Carrot Cake',
        description: 'Buttercream Carrot Cake',
        price: product11Price,
        quantity: 50,
        type: 'cakes',
        image: 'carrotcake.png'
	}); 

    let product12Price = parseFloat(2.00);
    let product12 = new Product({
        sku: 'SKU110021',
        name: 'Chiffon Cake',
        description: 'Birthday Chiffon Cake',
        price: product12Price,
        quantity: 50,
        type: 'cakes',
        image: 'chiffoncake.png'
	}); 

	await Promise.all([
			user1.save(),
            user2.save(),
            user3.save(),
            product1.save(),
            product2.save(),
            product3.save(),
            product4.save(),
            product5.save(),
            product6.save(),
            product7.save(),
            product8.save(),
            product9.save(),
            product10.save(),
            product11.save(),
            product12.save()

		]);

	let currentUsers = await User.find({});


	//console.log(currentUsers);

	process.exit();

})();






