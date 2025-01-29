const alfabetDK = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå';
const key = 5;
console.log('Key:', key);
const cleartext = 'Hej med dig.';
console.log('Cleartext:', cleartext);

// Krypterings funktion
function vigE(key, cleartext) {
	let result = '';

	for (let i = 0; i < cleartext.length; i++) {
		const index = alfabetDK.indexOf(cleartext[i]);
		console.log('Index', index, '=', cleartext[i]);
		if (index !== -1) {
			const newindex = (index + key) % alfabetDK.length;

			result += alfabetDK.charAt(newindex);

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
	'"' + vigE(key, cleartext) + '"'
);
