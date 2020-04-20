const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Lang = require('../../models/Lang');
const CountryLang = require('../../models/CountryLang');
const auth = require('../../middleware/auth');
const Role = require('../../models/Role');
// @rout    GET api/user
// @desc    Test countries route
// @access  Private
//router.get('/', (req, res) => res.send('Lang route'));

router.post('/', auth, async (req, res) => {
	try {
		if(!req.body.countrycode){
			return res.status(400).json({ errors: 'Please select countrycode' });
		}
		const result = await Lang.findAll({
					where:{
						countrycode : req.body.countrycode,
					},
					attributes:['langcode','locale']  
			});
		res.status(200).json(result);
	} catch (error) {
		console.error(error.message);
		res.status(500).send(`Server error: ${error}`);
	}
});
module.exports = router;

	  	/*const roleid = req.user.roleid;
		await Lang.findAll({
			include: [
			  {
				model: Role,
				attributes : ['roleid'],
				where:{
					roleid : roleid,
				}
			  }
			],attributes : ['countrycode','langcode','locale']}).then((result)=>{
				res.status(200).json(result);
			});*/
