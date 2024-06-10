import { ReactNode } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>My Next.js App</title>
      </Head>
      <body>
        <nav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/signup">Sign Up</a>
          <a href="/login">Login</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
