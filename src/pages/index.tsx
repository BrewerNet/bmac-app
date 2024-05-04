import Link from "next/link"


const Page = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">
        About
      </Link>
      <br/>
      <Link href="/signup/signup">
        Sign Up
      </Link>
      <br/>
      <Link href="/login/login">
        Login
      </Link>
    </div>
  );
}

export default Page