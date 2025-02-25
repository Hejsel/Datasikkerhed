// Funktion til at dekryptere med Vigenère Cipher
export function vigD(key, ciphertext, alfabet) {
	let result = '';
	let keyIndex = 0;
	for (let i = 0; i < ciphertext.length; i++) {
		const index = alfabet.indexOf(ciphertext[i]);
		if (index !== -1) {
			const keyChar = key[keyIndex % key.length];
			const keyShift = alfabet.indexOf(keyChar);
			const originalIndex = (index - keyShift + alfabet.length) % alfabet.length;
			result += alfabet.charAt(originalIndex);
			keyIndex++;
		} else {
			result += ciphertext[i];
		}
	}
	return result;
}
