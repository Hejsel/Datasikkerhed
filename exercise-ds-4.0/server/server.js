// server.js
import http from 'http';
import { handleAuthRoutes } from '../routes/authRouters.js';
import { getNewUserInfo } from '../controllers/authController.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	handleAuthRoutes(req, res);
});

server.listen(port, hostname, () => {
	console.log(`Server kører på http://${hostname}:${port}/`);
});
