import Link from "next/link"


const Page = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

export default Page