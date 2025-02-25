// Funktion til at kryptere med Caesar's Cipher
export function caesarE(key, cleartext, alfabet) {
	let result = '';
	for (let i = 0; i < cleartext.length; i++) {
		const index = alfabet.indexOf(cleartext[i]);
		if (index !== -1) {
			const newindex = (index + key) % alfabet.length;
			result += alfabet.charAt(newindex);
		} else {
			result += cleartext[i];
		}
	}
	return result;
}
