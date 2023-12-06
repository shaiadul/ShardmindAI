
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />
    </main>
  )
}
