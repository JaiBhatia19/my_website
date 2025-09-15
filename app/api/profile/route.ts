import { NextResponse } from 'next/server';
import { getProfileData } from '@/lib/content';

export async function GET() {
  try {
    const profile = await getProfileData();
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}
