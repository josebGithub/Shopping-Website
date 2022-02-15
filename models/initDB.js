const SweetBakeryDB = require('./sweetBakeryDB.js');

const {User, Product, Order, Cart} = SweetBakeryDB.getModel();

(async() => {

	await User.deleteMany({});

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


	await Promise.all([
			user1.save(),
            user2.save()
		]);

	let currentUsers = await User.find({});

	console.log(currentUser);

	process.exit();


})();






