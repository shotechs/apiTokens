const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

const {
	userValidation,
	registerValidation,
	loginValidation,
	getUserValidation
} = require("../validation/validation");


router.patch("/updateuser", async (req, res) => {
	//LETS VALIDATE THE DATA BEFORE WE MAKE A USER
	const { error } = userValidation(req.body);
	// // res.send(error.details[0].message);

	if (error) {
		const msg = { msg: 'Error:' + error.details[0].message }
		return res.status(400).json(msg);
		// return res.status(400).send(error.details[0].message);
	}

	//Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {


		//Create a new user
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			moneyType: req.body.moneyType,
			address_line_1: req.body.address_line_1,
			address_line_2: req.body.address_line_2,
			city: req.body.city,
			state: req.body.state,
			zip_code: req.body.zip_code,
			bio: req.body.bio,
			user_image: req.body.user_image
		});

	} else {
		const msg = { msg: 'Error: User does not exists' }
		return res.status(400).json(msg);
	}


	try {
		const saveUser = await user.save();
		// res.send({ user: user._id });
		//console.log("save")
		//get token
		const token = jwt.sign({ _id: saveUser._id }, process.env.TOKEN_SECRET, { expiresIn: 300 });
		req.session.user = saveUser
		res.header("auth-token", token).json({ auth: true, token: token, user: saveUser });
	} catch (error) {
		const msg = { msg: 'Error:' + error }
		return res.status(400).json(msg);
	}
});


router.post("/register", async (req, res) => {
	//LETS VALIDATE THE DATA BEFORE WE MAKE A USER

	const { error } = registerValidation(req.body);
	// // res.send(error.details[0].message);
	//console.log("error",error)
	//console.log("error.details[0].message",error.details[0].message)
	if (error) {
		const msg = { msg: `Register Error: ${error.details[0].message}` }
		
		return res.status(400).json(msg);
	}
//console.log("req.body",req.body)
	//Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		const msg = { msg: 'Error: Email already exists' }
		return res.status(400).json(msg);
	}

	//Hash passwords
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassowrd = await bcrypt.hash(req.body.password, salt);
	
	//Create a new user
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassowrd,
	});
	try {
	
		const saveUser = await user.save();
		// res.send({ user: user._id });

		const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET,
			{ expiresIn: 300 });
// delete user.password;
saveUser.password = "";
	console.log("saveUser", saveUser)

	
		res.header("auth-token", token).json({ auth: true, token: token, user: saveUser });
	} catch (error) {
		// res.status(400).send(error);
		const msg = { msg: 'Error:' + error }
		return res.status(400).json(msg);
	}
});

router.post("/login", async (req, res) => {
	//LETS VALIDATE THE DATA BEFORE WE Login

	const { error } = loginValidation(req.body);
	if (error) {
		const msg = { auth: false, msg: 'Login Error:' + error.details[0].message }
		return res.status(400).json(msg);
	}

	//Checking if the email is already in the database
	let user = await User.findOne({ email: req.body.email });
	if (!user) {
		const msg = { auth: false, msg: 'Error: Email or password is wrong' }
		return res.status(400).json(msg);
	}

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) {
		//return res.status(400).send("Username or password is wrong");
		msg = { auth: false, msg: 'Error: Email or password is wrong' }
		return res.status(400).json(msg);
	}

	//Create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	//res.header("auth-token", token).send("Logged in!" + token);

	// delete user.password;
	user.password = "";
	// req.session.user = user
	const msg = { auth: true, token: token, user: user }

	res.header("auth-token", token).json(msg);
	//res.send("Logged in!");
});

router.post("/userUpdate", async (req, res) => {
	//LETS VALIDATE user

	//Todo add error
	const { error } = getUserValidation(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	//Checking if the email is already in the database
	const user = await User.findOne({ email: req.body.email });
	//console.log("Id ", user);
	//no user found
	if (!user) {
		return res.status(400).send("Email or password is wrong #344");
	}
	//Create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	// delete user.password;
	user.password = "";
	// req.session.user = user
	const msg = { auth: true, token: token, user: user }

	res.header("auth-token", token).json(msg);
	// res.send("User send Update");
});

module.exports = router;
