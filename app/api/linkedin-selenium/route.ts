import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Check if Python and required packages are available
    const pythonAvailable = await checkPythonAvailability();
    if (!pythonAvailable) {
      console.log('Python not available, falling back to curated content');
      return await getFallbackContent();
    }

    // Run the Selenium scraper
    const scraperPath = path.join(process.cwd(), 'scripts', 'linkedin_selenium_scraper.py');
    
    // Set environment variables for the scraper
    const env = {
      ...process.env,
      LINKEDIN_EMAIL: process.env.LINKEDIN_EMAIL,
      LINKEDIN_PASSWORD: process.env.LINKEDIN_PASSWORD,
    };

    console.log('🐍 Running LinkedIn Selenium scraper...');
    
    const { stderr } = await execAsync(
      `source venv/bin/activate && python "${scraperPath}"`,
      { 
        env,
        timeout: 60000, // 60 second timeout
        cwd: process.cwd(),
        shell: '/bin/bash'
      }
    );

    if (stderr && !stderr.includes('INFO')) {
      console.error('Selenium scraper error:', stderr);
      return await getFallbackContent();
    }

    // Check if the scraper produced output
    const outputPath = path.join(process.cwd(), 'linkedin_data.json');
    
    try {
      const data = await fs.readFile(outputPath, 'utf-8');
      const linkedinData = JSON.parse(data);
      
      // Clean up the temporary file
      await fs.unlink(outputPath).catch(() => {});
      
      console.log('✅ Selenium scraper completed successfully');
      return NextResponse.json(linkedinData);
      
    } catch (fileError) {
      console.log('No output file found, using fallback');
      return await getFallbackContent();
    }

  } catch (error) {
    console.error('LinkedIn Selenium API error:', error);
    return await getFallbackContent();
  }
}

async function checkPythonAvailability(): Promise<boolean> {
  try {
    await execAsync('python3 --version');
    return true;
  } catch {
    try {
      await execAsync('python --version');
      return true;
    } catch {
      return false;
    }
  }
}

async function getFallbackContent() {
  try {
    // Fallback to curated posts from JSON file
    const postsPath = path.join(process.cwd(), 'data', 'linkedin-posts.json');
    const postsData = JSON.parse(await fs.readFile(postsPath, 'utf-8'));
    
    // Get the most recent posts (last 3)
    const recentPosts = postsData.posts.slice(0, 3);
    
    // Rotate through posts daily to simulate fresh content
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const postIndex = dayOfYear % recentPosts.length;
    
    const selectedPost = recentPosts[postIndex];

    return NextResponse.json({
      name: 'Jai Bhatia',
      headline: 'Sales Engineer & AI Solutions Architect | Building the future, one line of code at a time',
      location: 'Los Angeles, CA',
      recentActivity: [selectedPost],
      lastUpdated: new Date().toISOString(),
      note: 'Using curated content. Selenium scraper not available.'
    });
  } catch (error) {
    console.error('Fallback content error:', error);
    
    // Ultimate fallback
    return NextResponse.json({
      name: 'Jai Bhatia',
      headline: 'Sales Engineer & AI Solutions Architect | Building the future, one line of code at a time',
      location: 'Los Angeles, CA',
      recentActivity: [{
        id: '1',
        content: 'The future of QA is AI-powered, but human insight remains irreplaceable',
        type: 'post',
        date: new Date().toISOString().split('T')[0],
        hasComment: true
      }],
      lastUpdated: new Date().toISOString(),
      note: 'Using emergency fallback content'
    });
  }
}
