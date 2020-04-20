const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @rout    GET api/user
// @desc    Test route
// @access  Public
//router.get('/', (req, res) => res.send('Users route'));

// router.get('/', (req, res) => {
// 	User.findAll().then((users) => {
// 		//console.log(users);
// 		res.status(200).json(users);
// 	});
// });

router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
		check(
			'roleid',
			'Please enter a role id as numerical value with maximum 1 digit'
		)
			.isNumeric()
			.isLength({
				min: 1,
				max: 1,
			}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { email, password, roleid } = req.body;
			// See if user exists
			let user = await User.findOne({ where: { useremail: email } });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			// user = new User({
			// 	useremail: email.toString(),
			// 	password,
			// 	roleid,
			// });

			// Encrypt password

			const salt = await bcrypt.genSalt(10);
			hashedPassword = await bcrypt.hash(password, salt);

			await User.create({
				useremail: email,
				password: hashedPassword,
				roleid: roleid,
			});
			//await user.destroy();

			// Return jsonwebtoken
			const payload = {
				user: {
					useremail: email,
					roleid: roleid,
				},
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: 360000 },
				(error, token) => {
					if (error) {
						throw error;
					}
					return res.json({ token });
				}
			);
		} catch (error) {
			// console.error(error.message);
			return res.status(500).json({ errors: [{ msg: 'Server error' }] });
		}
	}
);

module.exports = router;
