const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Lang = require('../../models/Lang');
const auth = require('../../middleware/auth');
// @rout    GET api/user
// @desc    Test countries route
// @access  Private
//router.get('/', (req, res) => res.send('Lang route'));

router.get('/', auth, async (req, res) => {
	try {
        var constraint = 'true';
		await Lang.findAll({
            where : {
                enable : constraint
            },attributes:['langcode','countrycode','locale']
        }).then((countries)=>{
            res.status(200).json(countries);
        })
	} catch (error) {
		console.error(error.message);
		res.status(500).send(`Server error: ${error}`);
	}
});


module.exports = router;
