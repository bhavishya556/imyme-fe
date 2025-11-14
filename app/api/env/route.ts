import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        env: process.env.NEXT_PUBLIC_BASE_BACKEND_URL
    });
}