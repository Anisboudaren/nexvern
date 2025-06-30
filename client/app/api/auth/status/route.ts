// app/api/auth/status/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('nexvern-auth-token');
  console.log('Token:', token?.value);
  return NextResponse.json({ isLoggedIn: !!token });
}
