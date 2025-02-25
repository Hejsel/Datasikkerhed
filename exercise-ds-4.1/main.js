'use strict';
const readlineSync = require('readline-sync');
const sqlite3 = require('sqlite3').verbose();
const sha256 = require('crypto').createHash;

async function registerUser() {
	const db = new sqlite3.Database('./exercise-ds-4.1.db', (err) => {
		if (err) {
			console.error('❌ Kunne ikke åbne database');
		}
	});

	let userid;
	let password;

	do {
		userid = readlineSync.question('Indtast dit brugernavn: ');
		if (!userid.trim()) {
			console.log('❌ Brugernavnet må ikke være tomt!');
		} else if (userid.includes(' ')) {
			console.log('❌ Brugernavnet må ikke indeholde mellemrum!');
			userid = '';
		} else {
			const sql = 'SELECT id, COUNT(*) AS count FROM user WHERE userid = ?';
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
			}
		}
	} while (!userid.trim() || userid.includes(' '));

	do {
		password = readlineSync.question('Indtast dit password: ', { hideEchoBack: true });
		if (!password.trim()) {
			console.log('❌ Passwordet må ikke være tomt!');
		} else if (password.includes(' ')) {
			console.log('❌ Passwordet må ikke indeholde mellemrum!');
			password = '';
		}
	} while (!password.trim() || password.includes(' '));

	try {
		const hashedPassword = sha256('sha256').update(password).digest('hex');
		const sql = 'INSERT INTO user (userid, password) VALUES (?, ?)';
		await new Promise((resolve, reject) => {
			db.run(sql, [userid, hashedPassword], function (err) {
				if (err) {
					reject('❌ Fejl ved indsættelse af data: ' + err.message);
				} else {
					console.log(`✅ Hej ${userid}, du valgte et godt password!`);
					console.log(`✅ Din konto er nu oprettet! ID: ${this.lastID}, Brugernavn: ${userid}`);
					resolve();
				}
			});
		});
	} catch (error) {
		console.error('❌ Der opstod en fejl:', error);
	} finally {
		db.close();
	}
}

async function loginUser() {
	const db = new sqlite3.Database('./exercise-ds-4.1.db', (err) => {
		if (err) {
			console.error('❌ Kunne ikke åbne database');
		}
	});

	let userid;
	let password;

	do {
		userid = readlineSync.question('Indtast dit brugernavn: ');
		if (!userid.trim()) {
			console.log('❌ Brugernavnet må ikke være tomt!');
		} else if (userid.includes(' ')) {
			console.log('❌ Brugernavnet må ikke indeholde mellemrum!');
			userid = '';
		}
	} while (!userid.trim() || userid.includes(' '));

	do {
		password = readlineSync.question('Indtast dit password: ', { hideEchoBack: true });
		if (!password.trim()) {
			console.log('❌ Passwordet må ikke være tomt!');
		} else if (password.includes(' ')) {
			console.log('❌ Passwordet må ikke indeholde mellemrum!');
			password = '';
		}
	} while (!password.trim() || password.includes(' '));

	try {
		const sql = 'SELECT id, password FROM user WHERE userid = ?';
		const row = await new Promise((resolve, reject) => {
			db.get(sql, [userid], (err, row) => {
				if (err) {
					reject('❌ Fejl ved at hente bruger: ' + err.message);
				} else {
					resolve(row);
				}
			});
		});

		if (!row) {
			console.log('❌ Brugernavn eller password er forkert.');
			return;
		}

		const hashedPassword = sha256('sha256').update(password).digest('hex');
		if (hashedPassword === row.password) {
			console.log(`✅ Velkommen tilbage, ${userid}! ID: ${row.id}`);
		} else {
			console.log('❌ Brugernavn eller password er forkert.');
		}
	} catch (err) {
		console.error(err);
	} finally {
		db.close();
	}
}

console.log('1: Opret konto');
console.log('2: Log ind');
const choice = readlineSync.question('Vaelg en mulighed: ');
if (choice === '1') {
	registerUser();
} else if (choice === '2') {
	loginUser();
} else {
	console.log('❌ Ugyldigt valg');
}
