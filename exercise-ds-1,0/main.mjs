import { caesarE } from './modules/caesar-encryption.mjs';
import { caesarD } from './modules/caesar-decryption.mjs';

// Hovedfunktion, der samler alt og KUN KALDER de modulære funktioner
function runCaesarCipher(key, cleartext) {
	const alfabetDK = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå';

	const ciphertext = caesarE(key, cleartext, alfabetDK);
	console.log(`Clear-teksten: "${cleartext}" Krypteret til Cipher-teksten: "${ciphertext}"`);

	const decryptedText = caesarD(key, ciphertext, alfabetDK);
	console.log(`Cipher-teksten: "${ciphertext}" Dekrypteret til Clear-teksten: "${decryptedText}"`);
}

// Eksekvering af programmet
runCaesarCipher(7, 'Hej med dig.');

// Med denne kode kan vi oprette nye konstanter med andre alfabeter og benytte dem i funktionskaldene.
