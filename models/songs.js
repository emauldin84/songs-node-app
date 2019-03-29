const db = require('./conn');

class Song {
    constructor(id, title, artist, album, year) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year
    }

    static delete(id) {
        return db.result('delete from songs where id=$1', [id])
    }

    static add(songData) {
        // do an insert into the database
        // not using ${} because I don't want to interpolate
        // using ($) so that pg-promise does *safe* interpolation
        return db.one(`
        insert into songs
            (title, artist, album, year)
        values
            ($1, $2, $3, $4)
        returning id, title, artist, album, year
        `, [songData.title, songData.artist, songData.album, songData.year])
        .then((data) => {
            // console.log(data);
            return data.id;
        })
    }

    static async getAll() {
        let allSongs = await db.any(`select * from songs`);
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
        return db.one(`select * from songs where title='${title}'`)
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


    module.exports = Song;