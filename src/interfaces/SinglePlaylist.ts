export default interface SinglePlaylist {
    userID: string,
    id: string,
    userName: string,
    title: string,
    description: string,
    coverURL: string,
    filePath: string,
    createdAt: Date,
    songs: Song[]
}

interface Song {
    id: number
    title: string
    artist: string
}