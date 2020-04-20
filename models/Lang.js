const Sequelize = require('sequelize');
const db = require('../config/database');

const Lang = db.define(
	'langlookup',
	{
		countrycode: {
			type: Sequelize.STRING,
			primaryKey: true,
			required: true,
			unique: true,
        },
        langcode: {
			type: Sequelize.STRING,
			primaryKey: true,
            required: true
		},
		langdescription: {
			type: Sequelize.STRING,
			required: true,
		},
		locale: {
            type: Sequelize.INTEGER,
            required: true,
		},
	},
	{
		schema: 'master',
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Lang;
