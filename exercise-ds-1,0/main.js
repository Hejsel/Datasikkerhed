const alfabetDK = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå';
const key = 5;
const cleartext = 'Hej med dig.';
const ciphertext = caesarE(key, cleartext);

// Funktion til at kryptere med Caesar's Cipher
function caesarE(key, cleartext) {
	let result = '';

	for (let i = 0; i < cleartext.length; i++) {
		const index = alfabetDK.indexOf(cleartext[i]);
		//console.log('Index', index, '=', cleartext[i]);
		if (index !== -1) {
			const newindex = (index + key) % alfabetDK.length;

			result += alfabetDK.charAt(newindex);
			/*
			console.log(
				'Nøglens shift-værdig er sat til',
				key + '.',
				'Det betyder, at der en forskydning på',
				cleartext[i],
				'som er placeret på index',
				index + ',',
				'til at vi placerer os på index',
				newindex + '.',
				'Dette betyder at vi lander på bogstavet',
				alfabetDK.charAt(newindex) + '. Hvilket vil sige, at vi nu har krypteret',
				cleartext[i],
				'til at være',
				alfabetDK.charAt(newindex) + '.'	
			);
			*/
		} else {
			result += cleartext[i];
		}
	}
	return result;
}

console.log(
	'Clear-teksen:',
	'"' + cleartext + '"',
	'er nu krypteret til Cipher-teksten:',
	'"' + caesarE(key, cleartext) + '"'
);

// Funktion til at dekryptere med Caesar's Cipher
function caesarD(key, ciphertext) {
	let result = '';

	for (let i = 0; i < ciphertext.length; i++) {
		const index = alfabetDK.indexOf(ciphertext[i]);
		if (index !== -1) {
			const originalIndex = (index - key) % alfabetDK.length;

			result += alfabetDK.charAt(originalIndex);
		} else {
			result += ciphertext[i];
		}
	}
	return result;
}
console.log(
	'Cipher-teksten',
	'"' + ciphertext + '"',
	'er nu dekrypteret til Clear-teksten',
	'"' + caesarD(key, ciphertext) + '"'
);

/*
// Funktion til at kryptere med Caesar's Cipher
function caesarE(key, cleartext) {
	let resultat = '';
	for (let i = 0; i < cleartext.length; i++) {
		const kode = cleartext.charCodeAt(i);

		if (kode >= 65 && kode <= 90) {
			// Store bogstaver (A-Z)
			resultat += String.fromCharCode(((kode - 65 + key) % 26) + 65);
		} else if (kode >= 97 && kode <= 122) {
			// Små bogstaver (a-z)
			resultat += String.fromCharCode(((kode - 97 + key) % 26) + 97);
		} else {
			// Behold ikke-bogstaver som de er
			resultat += cleartext[i];
		}
	}
	return resultat;
}

// Funktion til at dekryptere med Caesar's Cipher
const caesarD = (key, chiffertext) => {
	let resultat = '';
	for (let i = 0; i < chiffertext.length; i++) {
		const kode = chiffertext.charCodeAt(i);

		if (kode >= 65 && kode <= 90) {
			// Store bogstaver (A-Z)
			resultat += String.fromCharCode(((kode - 65 - key + 26) % 26) + 65);
		} else if (kode >= 97 && kode <= 122) {
			// Små bogstaver (a-z)
			resultat += String.fromCharCode(((kode - 97 - key + 26) % 26) + 97);
		} else {
			// Behold ikke-bogstaver som de er
			resultat += chiffertext[i];
		}
	}
	return resultat;
};

// Test af funktionerne
const key = 7; // Nøgle med en shift-value på 7
const cleartext = 'Hej, verden!';
const chiffertext = caesarE(key, cleartext);
const dekrypteretTekst = caesarD(key, chiffertext);

console.log('Klartekst:', cleartext);
console.log('Chiffertekst:', chiffertext);
console.log('Dekrypteret tekst:', dekrypteretTekst);
*/
