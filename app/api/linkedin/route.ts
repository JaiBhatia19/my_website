import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Use manual JSON system - most reliable and professional
    console.log('📝 Using manual LinkedIn posts system');

    // Load posts from JSON file
    const postsPath = path.join(process.cwd(), 'data', 'linkedin-posts.json');
    const postsData = JSON.parse(await fs.readFile(postsPath, 'utf-8'));
    
    // Get the most recent 3 posts (always show the latest)
    const recentPosts = postsData.posts.slice(0, 3);
    
    // Filter out reposts without comments
    const filteredPosts = recentPosts.filter((post: any) => {
      if (post.type === 'repost' && !post.hasComment) {
        return false;
      }
      return true;
    });

    return NextResponse.json({
      name: 'Jai Bhatia',
      headline: 'Customer-facing technologist specializing in technical sales and applied AI',
      location: 'Los Angeles, CA',
      recentActivity: filteredPosts,
      lastUpdated: new Date().toISOString(),
      note: 'Manual LinkedIn posts - always up to date with your latest content'
    });
  } catch (error) {
    console.error('LinkedIn posts error:', error);
    
    // Return emergency fallback data
    return NextResponse.json({
      name: 'Jai Bhatia',
      headline: 'Customer-facing technologist specializing in technical sales and applied AI',
      location: 'Los Angeles, CA',
      recentActivity: [{
        id: '1',
        content: 'The future of QA is AI-powered, but human insight remains irreplaceable',
        type: 'post',
        date: new Date().toISOString().split('T')[0],
        hasComment: true
      }],
      lastUpdated: new Date().toISOString(),
      note: 'Emergency fallback content'
    });
  }
}


