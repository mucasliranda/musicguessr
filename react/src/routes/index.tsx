import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ArtistPage from "src/pages/Artist";



export default function Router() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist/:artistId" element={<ArtistPage />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  )
}