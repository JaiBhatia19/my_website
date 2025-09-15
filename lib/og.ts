/* eslint-disable */
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function generateOGImage(
  _title: string,
  _description?: string
) {
  // For now, return a simple response
  // In production, you would implement proper OG image generation
  return new Response('OG Image', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Jai Bhatia';
  const description = searchParams.get('description') || '';
  
  return generateOGImage(title, description);
}