const Sequelize = require('sequelize');
const db = require('../config/database');
//const { DataTypes } = require('sequelize');

const User = db.define(
	'countryuser1',
	{
		useremail: {
			type: Sequelize.STRING,
			primaryKey: true,
			required: true,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			required: true,
		},
		roleid: {
			type: Sequelize.INTEGER,
		},
		// createdAt: {
		// 	type: Sequelize.DATE,
		// },
		// updatedAt: {
		// 	type: Sequelize.DATE,
		// },
	},
	{
		schema: 'master',
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = User;
