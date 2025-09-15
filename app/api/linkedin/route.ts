import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Read curated LinkedIn posts from JSON file
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
      recentPosts: [selectedPost.content],
      postType: selectedPost.type,
      postDate: selectedPost.date,
      lastUpdated: new Date().toISOString(),
      note: 'Content rotates daily from curated LinkedIn posts. Update data/linkedin-posts.json to refresh content.'
    });
  } catch (error) {
    console.error('LinkedIn API error:', error);
    
    // Return fallback data
    return NextResponse.json({
      name: 'Jai Bhatia',
      headline: 'Sales Engineer & AI Solutions Architect | Building the future, one line of code at a time',
      location: 'Los Angeles, CA',
      recentPosts: ['The future of QA is AI-powered, but human insight remains irreplaceable'],
      lastUpdated: new Date().toISOString(),
      note: 'Using fallback content due to file read error'
    });
  }
}
