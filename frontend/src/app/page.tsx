import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/search')
  return (
    <>
      <p>Home</p>
    </>
  );
}