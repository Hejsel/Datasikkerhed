// rockyou.js
import fs from 'fs';
import path from 'path';

class Rockyou {
	static rockyou = ''; // 14.3 million bad passwords
	static #filename = path.resolve('C:/Users/benja/OneDrive/Skrivebord/rockyou/rockyou/rockyou.txt');

	static getRockyou() {
		if (Rockyou.rockyou === '') {
			Rockyou.rockyou = fs.readFileSync(Rockyou.#filename, 'utf8');
		}
	}
}

export default Rockyou;
