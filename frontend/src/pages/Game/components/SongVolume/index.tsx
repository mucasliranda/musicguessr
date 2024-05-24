import { useSongVolume } from "src/shared/hooks/useSongVolume";



export default function SongVolume() {
  const { changeVolume, volume } = useSongVolume();

  return (
    <>
      <input
        type='range'
        value={volume}
        min='0'
        max='100'
        onChange={(event) => changeVolume(Number(event.target.value))} 
      />
    </>
  );
}