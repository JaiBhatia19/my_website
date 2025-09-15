import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // Run the build-content script to refresh data
    const { stdout, stderr } = await execAsync('pnpm run build-content');
    
    if (stderr) {
      console.warn('Build content warnings:', stderr);
    }

    return NextResponse.json({
      success: true,
      message: 'Data refreshed successfully',
      timestamp: new Date().toISOString(),
      output: stdout,
    });
  } catch (error) {
    console.error('Data refresh error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to refresh data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
