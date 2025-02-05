'use strict';
const readlineSync = require('readline-sync'); // enable reads from the terminal (Kan bruges til vis du vil benytte dig af noget UI)
const sqlite3 = require('sqlite3').verbose();
const Rock = require('./module/rockyou.js'); // require Rockyou Singleton

/*
    The program must get the rockyou.txt as a CLI parameter.
    This way you do not have to include it in the hand in. 
    I can use my own.
    
    1. Get filename
    2. Populate the singleton occurrence of rockyou. See above
    3. Ask user to enter password
    4. Verify whether good or bad
    5. Write the result re the given requests
*/

// Læs rockyou.txt
Rock.getRockyou();

// Hent hele listen af dårlige passwords
const rockyouPasswords = Rock.rockyou.split('\n');

// Funktion til at kontrollere password
const erPasswordGodt = (password) => {
	return !rockyouPasswords.includes(password); // Returnerer true, hvis password ikke er i listen
};

// Funktion til at gemme brugerdata i databasen
const gemBrugerData = (userid, password) => {
	// Opret eller åbne SQLite database
	const db = new sqlite3.Database('./exercise-ds-3,0.db', (err) => {
		if (err) {
			console.error('Kunne ikke åbne database:', err.message);
			return;
		}
		console.log('Forbundet til SQLite-databasen.');
	});

	// Opret tabellen, hvis den ikke findes
	db.run(`CREATE TABLE IF NOT EXISTS users (userid TEXT, password TEXT)`, (err) => {
		if (err) {
			console.error('Fejl ved oprettelse af tabel:', err.message);
			return;
		}
	});

	// Indsæt brugerdata i tabellen
	const sql = 'INSERT INTO users (userid, password) VALUES (?, ?)';
	db.run(sql, [userid, password], (err) => {
		if (err) {
			console.error('Fejl ved indsættelse af data:', err.message);
		} else {
			console.log(`Brugerdata for ${userid} gemt! ID: ${this.lastID}`);
		}
	});

	// Luk forbindelsen til databasen
	db.close((err) => {
		if (err) {
			console.error('Fejl ved lukning af database:', err.message);
		} else {
			console.log('Forbindelsen til databasen er lukket.');
		}
	});
};

// Hent input fra brugeren
const userid = readlineSync.question('Indtast dit userid: ');
const password = readlineSync.question('Indtast dit password: ');

// Kontroller om password er godt nok
if (erPasswordGodt(password)) {
	console.log('Du valgte klogt!');
	gemBrugerData(userid, password); // Gem brugerdata i databasen
} else {
	console.log('Ikke godt nok, prøv igen');
}
