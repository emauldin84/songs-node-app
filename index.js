const http = require("http");
const querystring = require('querystring');
const hostname = '127.0.0.1';
const port = 5000;

// Import model classes
const Song = require('./models/songs')


const server = http.createServer(async (req, res) => {
    console.log(req.url)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    // if req.url is "/songs", send them all the songs
    // if req.url does not match, send a welcome message

    if (req.url.startsWith("/songs")) {
        const parts = req.url.split("/")
        const method = req.method;
        if (method === "GET") {
            if (parts.length === 2) {
                const allSongs = await Song.getAll();
                const allSongsJSON = JSON.stringify(allSongs);
                res.end(allSongsJSON);
            } else if (parts.length === 3) {
                const songId = parts[2];
                const theSong = await Song.getById(songId);
                const theSongJSON = JSON.stringify(theSong);
                res.end(theSongJSON);
            } else {
                res.statusCode = 404;
                res.end('Resource not found.')
            }
        } else if (method === "POST") {
            let body = '';
            req.on('data', (chunk) => {
                // .toString() is built into most objects
                // it returns a string representation of the object
                body += chunk.toString();
            });
            req.on('end', async () => {
                const parsedBody = querystring.parse(body);
                console.log('====================');
                console.log(parsedBody);
                console.log('^^^^^^ BODY OF FORM ^^^^^^^^');
                const newSongId = await Song.add(parsedBody);
                res.end(`{"song id": ${newSongId}}`);
            });
        } else if (method === "PUT") {
            res.end('{"message": "Are you looking to change history?"}');
        } else if (method === "DELETE") {
            if (parts.length === 3) {
                const songId = parts[2];
                await Song.delete(songId);
                res.end(`{"message": "Deleted song with id ${songId}"}`)
            } else {
                res.end('{"message": "Song ID does not exist"}');
            }
        } else {
            res.end('{"message": "That action does not exist."}')
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});
