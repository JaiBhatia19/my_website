import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const profileUrl = 'https://www.linkedin.com/in/jaibhatia19/';
    
    const response = await axios.get(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
    });

    const $ = cheerio.load(response.data);
    
    // Extract basic profile info
    const name = $('h1.text-heading-xlarge').first().text().trim() || 'Jai Bhatia';
    const headline = $('.text-body-medium.break-words').first().text().trim() || 'Sales Engineer and AI-minded Solutions Architect';
    const location = $('.text-body-small.inline.t-black--light.break-words').first().text().trim() || 'Los Angeles, CA';
    
    // Extract recent posts (this is limited due to LinkedIn's structure)
    const recentPosts = $('.feed-shared-text').slice(0, 1).map((_, el) => {
      const text = $(el).text().trim();
      return text.length > 0 ? text : null;
    }).get().filter(Boolean);

    return NextResponse.json({
      name,
      headline,
      location,
      recentPosts: recentPosts.slice(0, 1),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    
    // Return fallback data
    return NextResponse.json({
      name: 'Jai Bhatia',
      headline: 'Sales Engineer and AI-minded Solutions Architect building useful products',
      location: 'Los Angeles, CA',
      recentPosts: ['The future of QA is AI-powered, but human insight remains irreplaceable'],
      lastUpdated: new Date().toISOString(),
    });
  }
}
