import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const resumePath = join(process.cwd(), 'public', 'Jai_Bhatia_Resume.html');
    const resumeContent = await readFile(resumePath, 'utf-8');
    
    return new NextResponse(resumeContent, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return new NextResponse('Resume not found', { status: 404 });
  }
}
