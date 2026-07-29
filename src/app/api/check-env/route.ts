import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    MONGODB_URI: !!process.env.MONGODB_URI,
    AUTH_GOOGLE_ID: !!process.env.AUTH_GOOGLE_ID,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    VERCEL_URL: !!process.env.VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV
  });
}
