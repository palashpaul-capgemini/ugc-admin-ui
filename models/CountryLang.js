const Sequelize = require('sequelize');
const db = require('../config/database');

const CountryLang = db.define(
	'countrylangconfig',
	{
		countrycode: {
			type: Sequelize.STRING,
			primaryKey: true,
			required: true,
        },
        locale: {
			type: Sequelize.STRING,
			primaryKey: true,
            required: true
		},
		setlocale: {
            type: Sequelize.STRING,
            primaryKey: true,
			required: true,
		},
		isdefault: {
			type: Sequelize.BOOLEAN,
		},
		insertdatetime: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.NOW
		}
	},
	{
		schema: 'master',
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = CountryLang;
