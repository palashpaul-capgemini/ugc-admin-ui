const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @rout    GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
	//res.send('Auth route')

	try {
		//const user = await User.findOne(req.user.useremail).select('-password');
		const user = await User.findOne({
			where: { useremail: req.user.useremail },
			attributes: {
				include: [],
				exclude: ['password'],
			},
		});
		return res.status(200).json(user);
	} catch (error) {
		// console.error('Error: ' + error);
		return res.status(500).json({ errors: [{ msg: 'Server error' }] });
	}
});

// @rout    POST api/auth
// @desc    Authenticate user & Get token
// @access  Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { email, password } = req.body;

			let user = await User.findOne({
				where: { useremail: email },
			});

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			// Compare user
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				// return res.status(400).json({ errors: 'Invalid Credentials' });
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			// Return jsonwebtoken
			const payload = {
				user: {
					useremail: email,
					roleid: user.roleid,
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

			//res.send('Users route');
		} catch (error) {
			return res.status(500).json({ errors: [{ msg: 'Server error' }] });
		}
	}
);

module.exports = router;
