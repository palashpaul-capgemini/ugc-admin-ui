const Sequelize = require('sequelize');

module.exports = new Sequelize(
	process.env.DATABASE,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT,
		pool: {
			max: 20,
			min: 0,
			connectionTimeoutMillis: 0,
			idleTimeoutMillis: 0,
			idle: 10000,
		},
	}
);
