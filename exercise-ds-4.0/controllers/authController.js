// authController.js
import readlineSync from 'readline-sync';
import bcrypt from 'bcryptjs';
import { checkUserExists, saveUserData } from '../models/userModel.js';

export async function getNewUserInfo() {
	let userid = '';
	let password = '';

	do {
		userid = readlineSync.question('Indtast dit brugernavn: ');

		if (!userid.trim()) {
			console.log('❌ Brugernavnet må ikke være tomt!');
		} else if (userid.includes(' ')) {
			console.log('❌ Brugernavnet må ikke indeholde mellemrum!');
			userid = '';
		} else {
			if (await checkUserExists(userid)) {
				console.log('❌ Brugernavnet er allerede taget. Prøv et andet.');
				userid = '';
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
	return password.length >= 8; // Simple password check (min. 8 tegn)
}
