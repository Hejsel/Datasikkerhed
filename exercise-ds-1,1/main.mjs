import { vigE } from './modules/vigenére-encryption.mjs';
import { vigD } from './modules/vigenére-decryption.mjs';

// Hovedfunktion, der samler alt og KUN KALDER de modulære funktioner
function runVigenereCipher(key, cleartext) {
	const alfabetDK = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå';

	const ciphertext = vigE(key, cleartext, alfabetDK);
	console.log(`Clear-teksten: "${cleartext}" krypteret til Cipher-teksten: "${ciphertext}"`);

	const decryptedText = vigD(key, ciphertext, alfabetDK);
	console.log(`Cipher-teksten: "${ciphertext}" dekrypteret til Clear-teksten: "${decryptedText}"`);
}

// Eksekvering af programmet
runVigenereCipher('benh', 'Hej med dig.');
