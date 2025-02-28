const model = require('../models/dbhandlers');

exports.postRegister = async function(req, res, next) {
    try {
        await model.insertRegister(req, res, next);
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
};