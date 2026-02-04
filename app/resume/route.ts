import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

const RESUME_FILENAME = 'resume.pdf';

export async function GET() {
  try {
    const resumePath = join(process.cwd(), 'public', RESUME_FILENAME);
    const resumeBuffer = await readFile(resumePath);
    return new NextResponse(resumeBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Jai_Bhatia_Resume.pdf"',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return new NextResponse('Resume not found', { status: 404 });
  }
}
