const models = require('../models/dbhandlers');

module.exports = {

	postCity: async function(req, res, next) {
		try {
			await models.insertCity(req, res, next);
			next();
		} catch (err) {
			console.log(err);
			return res.status(500).json({message: err.message});
		}
	},

	getContinents: async function (req, res, next) {
		let rows = await models.getAllContinents(req, res, next);
		res.locals.continents = rows;
		next();
	},

	getCountries: async function (req, res, next) {
		let rows = await models.getAllCountries(req, res, next);
		res.locals.countries = rows;
		next();
	},

	getCities: async function (req, res, next) {
		let rows = await models.getAllCities(req, res, next);
		res.locals.cities = rows;
		next();
	},

	getLanguages: async function (req, res, next) {
		let rows = await models.getAllLanguages(req, res, next);
		res.locals.languages = rows;
		next();
	}

}
