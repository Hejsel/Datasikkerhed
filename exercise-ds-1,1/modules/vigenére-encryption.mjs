// Funktion til at kryptere med Caesar's Cipher
export function vigE(key, cleartext, alfabet) {
	let result = '';
	let keyIndex = 0;
	for (let i = 0; i < cleartext.length; i++) {
		const index = alfabet.indexOf(cleartext[i]);
		if (index !== -1) {
			const keyChar = key[keyIndex++ % key.length];
			const keyShift = alfabet.indexOf(keyChar);
			const newindex = (index + keyShift) % alfabet.length;
			result += alfabet.charAt(newindex);
			//keyIndex++;
		} else {
			result += cleartext[i];
		}
	}
	return result;
}
