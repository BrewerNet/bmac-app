import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request:any) {
  const { identifier, password } = await request.json();
  const signupUrl = process.env.NEXT_PUBLIC_SIGNUP_URL;
  if (!signupUrl) {
    return NextResponse.json({ error: 'SIGNUP_URL environment variable is not defined' }, { status: 500 });
  }

  try {
    const response = await axios.post(signupUrl, { identifier, password });
    if (response.status === 200) {
      return NextResponse.json({ message: 'Signup successful', data: response.data });
    } else {
      return NextResponse.json({ error: 'Failed to signup' }, { status: response.status });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error signing up', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error', details: String(error) }, { status: 500 });
    }
  }
}