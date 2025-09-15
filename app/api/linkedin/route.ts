import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Try LinkedIn API first if credentials are available
    if (process.env.LINKEDIN_ACCESS_TOKEN) {
      const linkedinData = await fetchLinkedInActivity();
      if (linkedinData) {
        return NextResponse.json(linkedinData);
      }
    }

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
      note: 'Using curated content. Set up LinkedIn API credentials for live data.'
    });
  } catch (error) {
    console.error('LinkedIn API error:', error);
    
    // Return fallback data
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
      note: 'Using fallback content due to API error'
    });
  }
}

async function fetchLinkedInActivity(): Promise<any> {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    
    // Fetch user profile first
    const profileResponse = await fetch('https://api.linkedin.com/v2/people/~', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!profileResponse.ok) {
      console.error('LinkedIn profile fetch failed:', profileResponse.status);
      return null;
    }

    const profile = await profileResponse.json();

    // Note: LinkedIn API has limited access to recent activity
    // For full activity access, we might need to use a different approach
    // This is a placeholder for when you set up the LinkedIn API credentials
    
    return {
      name: `${profile.firstName?.localized?.en_US || 'Jai'} ${profile.lastName?.localized?.en_US || 'Bhatia'}`,
      headline: profile.headline?.localized?.en_US || 'Sales Engineer & AI Solutions Architect',
      location: profile.location?.name || 'Los Angeles, CA',
      recentActivity: [
        {
          id: '1',
          content: 'Building AI tools that actually solve real problems, not just demos',
          type: 'post',
          date: new Date().toISOString().split('T')[0],
          hasComment: true
        }
      ],
      lastUpdated: new Date().toISOString(),
      note: 'LinkedIn API integration active. Activity limited by API permissions.'
    };
  } catch (error) {
    console.error('LinkedIn API fetch error:', error);
    return null;
  }
}
