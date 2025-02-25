export function handleAuthRoutes(req, res) {
	console.log(`Indkommende request: ${req.method} ${req.url}`); // Debugging

	if (req.method === 'GET' && req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Velkommen til serveren!' }));
		return;
	}

	if (req.method === 'POST' && req.url === '/register') {
		(async () => {
			try {
				const { userid, password } = await getNewUserInfo();
				res.writeHead(201, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'Bruger oprettet', userid }));
			} catch (err) {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ error: 'Fejl under brugeroprettelse' }));
			}
		})();
		return;
	}

	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ error: 'Route not found' }));
}
