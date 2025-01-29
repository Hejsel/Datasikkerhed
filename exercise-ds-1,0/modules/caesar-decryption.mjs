// Funktion til at dekryptere med Caesar's Cipher
export function caesarD(key, ciphertext, alfabet) {
	let result = '';
	for (let i = 0; i < ciphertext.length; i++) {
		const index = alfabet.indexOf(ciphertext[i]);
		if (index !== -1) {
			const originalIndex = (index - key + alfabet.length) % alfabet.length;
			result += alfabet.charAt(originalIndex);
		} else {
			result += ciphertext[i];
		}
	}
	return result;
}
