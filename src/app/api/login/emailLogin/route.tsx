import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request:any) {
  try {
    const { identifier, password } = await request.json();
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
    if (!loginUrl) {
      return NextResponse.json({ error: 'LOGIN_URL environment variable is not defined' }, { status: 500 });
    }

    const response = await axios.post(loginUrl, { identifier, password });
    if (response.status === 200) {
      return NextResponse.json({ message: 'Login successful', data: response.data });
    } else {
      return NextResponse.json({ error: 'Failed to login' }, { status: response.status });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error logging in', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error', details: String(error) }, { status: 500 });
    }
  }
}
