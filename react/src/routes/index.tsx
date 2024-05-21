import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ArtistPage from "src/pages/Artist";
import GamePage from "src/pages/Game";



export default function Router() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/artist/:artistId" element={<ArtistPage/>} />
      <Route path="/game/:gameId" element={<GamePage/>} />
    </Routes>
  )
}