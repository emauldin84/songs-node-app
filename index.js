const express = require('express');
const app = express();
const http = require("http");
const querystring = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;

// Import model classes
const Song = require('./models/songs')


app.get('/songs', async (req, res) => {
    const allSongs = await Song.getAll();
    res.json(allSongs);
})
app.get('/songs/:id', async (req, res) => {
    const theSong = await Song.getById(req.params.id);
    res.json(theSong);
})

app.post('/songs', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        // .toString() is built into most objects
        // it returns a string representation of the object
        body += chunk.toString();
});
    req.on('end', async () => {
        const parsedBody = querystring.parse(body);
        const newSongId = await Song.add(parsedBody);
        res.send(`Added Song ID: ${newSongId}`)
    })
})



app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
