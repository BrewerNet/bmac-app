import Link from "next/link"


const Page = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <a href="/about">About</a>
        <a href="/signup">Sign Up</a>
        <a href="/login">Login</a>
      </nav>
    </div>
  );
}

export default Page