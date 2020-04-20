const Sequelize = require('sequelize');
const db = require('../config/database');
const Lang = require('./Lang');

const Role = db.define(
	'userroles',
	{
		roleid: {
			type: Sequelize.INTEGER,
		},
		countrycode: {
			type: Sequelize.STRING,
			primaryKey: true,
			required: true,
			unique: true,
		},
	},
	{
		schema: 'master',
		freezeTableName: true,
		timestamps: false,
	}
);
Lang.hasMany(Role,{foreignKey: 'countrycode'});
Role.belongsTo(Lang,{foreignKey: 'countrycode'});

module.exports = Role;
