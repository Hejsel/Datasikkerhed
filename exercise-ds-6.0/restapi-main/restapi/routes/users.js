const express = require('express');
const router = express.Router();

const con = require('../controllers/controllers');

/* GET user register ie send form */
router.get('/register',/*middleware skal placeres her*/ function(req, res, next) {
  	res.render('register', {
	  	title: 'Please Register',
	  	subtitle: 'Follow the embedded cues'
  	});
});

router.post('/register', con.postRegister, function(req, res, next) {
	// variables from middleware
	res.json({login: '✅ Succes du har nu oprettet en bruger.'});
});

router.get('/login', function(req, res, next) {
	res.render('login', {
		title: 'Please Login'
	});
});



module.exports = router;
