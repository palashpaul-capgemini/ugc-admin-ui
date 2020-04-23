const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Lang = require('../../models/Lang');
const auth = require('../../middleware/auth');
const CountryLang = require('../../models/CountryLang');
const Country = require('../../models/Country');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//const Pool = require('pg').Pool
//const connectionString = 'postgresql://usercontent:usercontent123@34.76.202.103:5432/usercontent'
//const pool = new Pool({
//connectionString : connectionString
//})

// @rout    GET api/user
// @desc    Test countries route
// @access  Private
//router.get('/', (req, res) => res.send('ListConfig route'));
router.post('/', auth, async (req, res) => {
	try {
		var countrycode = req.body.countrycode;
		var constraint = 'true';
		if (!countrycode) {
			return res.status(400).json({ errors: 'Invalid CountryCode' });
		}
		var filter = [];
		await CountryLang.findAll({
			attributes: ['setlocale'],
			where: {
				countrycode: countrycode,
			},
		}).then((result) => {
			result.forEach((element) => {
				filter.push(element.dataValues.setlocale);
			});
		});
		var input = [];
		await Lang.findAll({
			where: {
				enable: constraint,
				locale: {
					[Op.notIn]: filter,
				},
			},
			attributes: ['langcode', 'countrycode', 'locale'],
		}).then((countries) => {
			//res.status(200).json(countries);
			countries.forEach((country) => {
				input.push(country.countrycode);
			});
		});
		console.log(input);
		await Country.findAll({
			include: [
				{
					model: Lang,
					where: {
						enable: 'true',
						countrycode: input,
					},
					attributes: ['countrycode', 'langcode', 'locale'],
				},
			],
			attributes: ['countryname', 'countrycode'],
		}).then((countries) => {
			res.status(200).json(countries);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send(`Server error: ${error}`);
	}
});

module.exports = router;
/*var countrycode = req.body.countrycode;
    var constraint = 'true';
    if(!countrycode){
        return res.status(400).json({ errors: 'Invalid CountryCode'});
    }
    pool.query(`select * from master.langlookup l where enable = $1
    and l.locale NOT IN (select c.setlocale from master.countrylangconfig c
    where c.countrycode = $2)`,[constraint,countrycode],(error,results) => {
    if(error){
		res.status(500).send(`Server error: ${error}`);
      }
      res.status(200).json(results.rows);
    });
});*/
