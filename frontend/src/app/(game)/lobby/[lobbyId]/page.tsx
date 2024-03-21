import Aside from "../components/Aside";
import Main from "../components/Main";




export default async function Lobby() {

  return (
    <div className="w-full max-w-screen-2xl h-screen flex">
      <Aside />

      <Main />
    </div>
  )
}