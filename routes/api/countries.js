const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Country = require('../../models/Country');
const auth = require('../../middleware/auth');
const Role = require('../../models/Role');

// @rout    GET api/user
// @desc    Test countries route
// @access  Private
//router.get('/', (req, res) => res.send('Countries route'));

router.get('/', auth, async (req, res) => {
	try {
		console.log(req.user);
		const roleid = req.user.roleid;
		await Country.findAll({
			include: [
			  {
				model: Role,
				attributes : [ ],
				where:{
					roleid : roleid,
				}
			  }
			],attributes : ['countrycode' , 'countryname']}).then((countries) => {
				res.status(200).json(countries);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send(`Server error: ${error}`);
	}
});

module.exports = router;
