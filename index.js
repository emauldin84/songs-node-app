const http = require("http");
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
            res.end('{"message": "Are you trying to make history?"}');
        } else if (method === "PUT") {
            res.end('{"message": "Are you looking to change history?"}');
        } else if (method === "DELETE") {
            res.end('{"message": "Stop the music?"}');
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});
