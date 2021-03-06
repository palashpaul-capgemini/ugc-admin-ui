const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const CountryLang = require('../../models/CountryLang');
const auth = require('../../middleware/auth');
const Country = require('../../models/Country');
const Lang = require('../../models/Lang');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// @rout    GET api/user
// @desc    Test countries route
// @access  Private
//router.get('/', (req, res) => res.send('Lang route'));

router.post('/', auth, async (req, res) => {
	try {
		if (!req.body.countrycode) {
			return res.status(400).json({ errors: 'Invalid CountryCode' });
		}
		var filter = [];
		await CountryLang.findAll({
			attributes: ['setlocale'],
			where: {
				countrycode: req.body.countrycode,
			},
		}).then((result) => {
			result.forEach((element) => {
				filter.push(element.setlocale);
			});
		});
		console.log(filter);
		var input = [];
		await Lang.findAll({
			where: {
				enable: 'true',
				locale: {
					[Op.in]: filter,
				},
			},
			attributes: ['langcode', 'countrycode', 'locale'],
		}).then((countries) => {
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
						locale: {
							[Op.in]: filter,
						},
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
router.post('/savelocale', auth, async (req, res) => {
	try {
		if (!req.body.countrycode) {
			return res.status(400).json({ errors: 'Invalid CountryCode' });
		}
		if (!req.body.locale) {
			return res.status(400).json({ errors: 'Please choose locale' });
		}
		var filter = [];
		await CountryLang.findAll({
			attributes: ['setlocale'],
			where: {
				countrycode: req.body.countrycode,
				locale: req.body.locale,
			},
		}).then((result) => {
			result.forEach((element) => {
				filter.push(element.setlocale);
			});
		});
		console.log(filter);
		var input = [];
		await Lang.findAll({
			where: {
				enable: 'true',
				locale: {
					[Op.in]: filter,
				},
			},
			attributes: ['langcode', 'countrycode', 'locale'],
		}).then((countries) => {
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
						locale: {
							[Op.in]: filter,
						},
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
router.post('/save', auth, async (req, res) => {
	if (!req.body.locale) {
		return res.status(400).json({ errors: 'Please select locale' });
	}
	if (!req.body.countrycode) {
		return res.status(400).json({ errors: 'Invalid CountryCode' });
	}
	var data = [];
	var countrycode = req.body.countrycode;
	var locale = req.body.locale;
	for (var itr = 0; itr < req.body.configlist.length; itr++) {
		var obj = {
			countrycode: countrycode,
			locale: locale,
			setlocale: req.body.configlist[itr],
			isdefault: true,
		};
		data.push(obj);
	}
	try {
		await CountryLang.bulkCreate(data, { returning: true }).then((response) =>
			res.status(200).json(response)
		);
	} catch (error) {
		console.error(error.message);
		res.status(500).send(`Server error: ${error}`);
	}
});
router.post('/delete', auth, async (req, res) => {
	var countrycode = req.body.countrycode;
	var locale = req.body.locale;
	var constraint = req.body.configlist;
	try {
		if (!req.body.locale) {
			return res.status(400).json({ errors: 'Please select locale' });
		}
		if (!req.body.countrycode) {
			return res.status(400).json({ errors: 'Invalid CountryCode' });
		}
		await CountryLang.destroy({
			where: {
				locale: locale,
				setlocale: constraint,
				countrycode: countrycode,
			},
		}).then((response) => res.status(200).json(response));
	} catch (error) {
		console.error(error.message);
		res.status(500).send(`Server error: ${error}`);
	}
});

module.exports = router;
