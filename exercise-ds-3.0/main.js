'use strict';
const readlineSync = require('readline-sync');
const Rockyou = require('./module/rockyou.js');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

async function getNewUserInfo(userid, password) {
	Rockyou.getRockyou();
	do {
		userid = readlineSync.question('Indtast dit brugernavn: ');

		if (!userid.trim()) {
			console.log('❌ Brugernavnet må ikke være tomt!');
		} else if (userid.includes(' ')) {
			console.log('❌ Brugernavnet må ikke indeholde mellemrum!');
			userid = '';
		} else {
			const db = new sqlite3.Database('./exercise-ds-3,0.db', (err) => {
				if (err) {
					console.error('❌ Kunne ikke åbne database');
				}
			});
			const sql = 'SELECT COUNT(*) AS count FROM user WHERE userid = ?';
			try {
				const row = await new Promise((resolve, reject) => {
					db.get(sql, [userid], (err, row) => {
						if (err) {
							reject('❌ Fejl ved at tjekke bruger: ' + err.message);
						} else {
							resolve(row);
						}
					});
				});
				if (row.count > 0) {
					console.log('❌ Brugernavnet er allerede taget. Prøv et andet.');
					userid = '';
				}
			} catch (err) {
				console.error(err);
			} finally {
				db.close();
			}
		}
	} while (!userid.trim() || userid.includes(' '));

	do {
		password = readlineSync.question('Indtast dit password: ');

		if (!password.trim()) {
			console.log('❌ Passwordet må ikke være tomt!');
		} else if (password.includes(' ')) {
			console.log('❌ Passwordet må ikke indeholde mellemrum!');
			password = '';
		} else if (!passwordStrengthChecker(password)) {
			console.log('❌ Dette password er for svagt, prøv et andet.');
			password = '';
		}
	} while (!password.trim() || password.includes(' ') || !passwordStrengthChecker(password));

	console.log(`✅ Hej ${userid}, du valgte et godt password!`);
	await saveUserData(userid, password);
	return { userid, password };
}

function passwordStrengthChecker(password) {
	const rockyouPasswords = Rockyou.rockyou.split('\n');
	return !rockyouPasswords.includes(password);
}

getNewUserInfo();

async function saveUserData(userid, password) {
	try {
		userid.replace(/\s/g, '');
		password.replace(/\s/g, '');

		const hashedPassword = await bcrypt.hash(password, 10);
		const db = new sqlite3.Database('./exercise-ds-3,0.db', (err) => {
			if (err) {
				throw new Error('❌ Kunne ikke åbne database');
			}
		});
		const sql = 'INSERT INTO user (userid, password) VALUES (?, ?)';
		await new Promise((resolve, reject) => {
			db.run(sql, [userid, hashedPassword], (err) => {
				if (err) {
					reject('❌ Fejl ved indsættelse af data: ' + err.message);
				} else {
					resolve();
				}
			});
		});
		console.log(`✅ Brugerdata for ${userid} er nu gemt i databasen!`);
		db.close((err) => {
			if (err) {
				console.error('❌ Fejl ved lukning af database:', err.message);
			}
		});
	} catch (error) {
		console.error('❌ Der opstod en fejl:', error);
	}
}
