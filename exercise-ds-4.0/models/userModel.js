// userModel.js
import bcrypt from 'bcryptjs';
import betterSqlite3 from 'better-sqlite3';

// Opret forbindelse til databasen
const db = betterSqlite3('../db/database.db');

// Funktion til at tjekke om brugernavnet allerede eksisterer
export function checkUserExists(userid) {
	const stmt = db.prepare('SELECT COUNT(*) AS count FROM user WHERE userid = ?');
	const row = stmt.get(userid);
	return row.count > 0;
}

// Funktion til at gemme brugerdata (med hash af password)
export async function saveUserData(userid, password) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const stmt = db.prepare('INSERT INTO user (userid, password) VALUES (?, ?)');
		stmt.run(userid, hashedPassword);

		console.log(`✅ Brugerdata for ${userid} er nu gemt i databasen!`);
	} catch (error) {
		console.error('❌ Der opstod en fejl ved gemning af data:', error);
	}
}
