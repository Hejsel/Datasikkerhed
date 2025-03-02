const bcrypt = require('bcryptjs');
const model = require('../models/dbhandlers');

exports.postRegister = async function(req, res, next) {
    try {
        // 🔑 Hash passwordet inden det sendes videre
        const saltRounds = 10;
        res.locals.hash = await bcrypt.hash(req.body.password, saltRounds);

        // ⬇️ Send videre til modellen
        await model.insertRegister(req, res, next);
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
};
