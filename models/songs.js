const db = require('./conn');

class Song {
    constructor(id, title, artist, album, year) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year
    }

    static async getAll() {
        let allSongs = await db.any(`select * from songs`);
        console.log(allSongs)
        return allSongs
    }

    static getById(id) {
        return db.one(`select * from songs where id=${id}`)
        .then((songData) => {
            const songInstance = new Song(
                songData.id,
                songData.title,
                songData.artist,
                songData.album,
                songData.year
            );
            return songInstance
        })
    }
    
    static getByTitle(title) {
        return db.one(`select * from songs where title ilike '${title}'`)
        .then((songData) => {
            const songInstance = new Song(
                songData.id,
                songData.title,
                songData.artist,
                songData.album,
                songData.year
                );
                return songInstance
            })
            
            
        }
    }

    Song.getAll();