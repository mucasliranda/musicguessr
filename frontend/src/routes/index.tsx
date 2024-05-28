import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import ArtistPage from "src/pages/Artist";
import GamePage from "src/pages/Game";
import ChooseSongsFromAlbumPage from "src/pages/ChooseSongsFromAlbum";
import SearchPage from "src/pages/Search";
import ChooseSongsFromPlaylistPage from "src/pages/ChooseSongsFromPlaylist";



export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/search" element={<SearchPage/>} />
      
      <Route path="/artist/:artistId" element={<ArtistPage/>} />
      <Route path="/artist/:artistId/:albumId" element={<ChooseSongsFromAlbumPage/>} />
      <Route path="/playlist/:playlistId" element={<ChooseSongsFromPlaylistPage/>} />
      
      <Route path="/game/:gameId" element={<GamePage/>} />
    </Routes>
  )
}