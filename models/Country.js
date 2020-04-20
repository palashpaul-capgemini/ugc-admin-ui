const Sequelize = require('sequelize');
const db = require('../config/database');
const Role = require('./Role');

const Country = db.define(
	'countrylookup',
	{
		countrycode: {
			type: Sequelize.STRING,
			primaryKey: true,
			required: true,
			unique: true,
		},
		countryname: {
			type: Sequelize.STRING,
			required: true,
		},
		enable: {
			type: Sequelize.INTEGER,
		},
	},
	{
		schema: 'master',
		freezeTableName: true,
		timestamps: false,
	}
);
Country.hasOne(Role, { foreignKey: 'countrycode' });
Role.belongsTo(Country, { foreignKey: 'countrycode' });

Country.sync();
Role.sync();

module.exports = Country;
