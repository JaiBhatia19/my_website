import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    // Try to scrape public LinkedIn profile (without authentication)
    const linkedinData = await scrapePublicLinkedInProfile();
    if (linkedinData) {
      return NextResponse.json(linkedinData);
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
      note: 'Using curated content. LinkedIn blocks public scraping.'
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

async function scrapePublicLinkedInProfile(): Promise<any> {
  try {
    // Try different LinkedIn URLs that might be publicly accessible
    const urls = [
      'https://www.linkedin.com/in/jaibhatia19/',
      'https://linkedin.com/in/jaibhatia19/',
      'https://www.linkedin.com/pub/jai-bhatia/',
    ];

    for (const url of urls) {
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0'
          },
          timeout: 10000,
          maxRedirects: 5,
        });

        // Check if we got a sign-in page (which means scraping is blocked)
        if (response.data.includes('Sign in') || response.data.includes('authwall')) {
          console.log(`LinkedIn blocked scraping for ${url}`);
          continue;
        }

        const $ = cheerio.load(response.data);
        
        // Extract profile information
        const name = $('h1').first().text().trim() || 'Jai Bhatia';
        const headline = $('.text-body-medium, .pv-text-details__left-panel h1 + .text-body-medium').first().text().trim() || 
                        'Sales Engineer & AI Solutions Architect';
        const location = $('.text-body-small.inline, .pv-text-details__left-panel .text-body-small').first().text().trim() || 
                        'Los Angeles, CA';

        // Try to extract recent activity (this is limited on public profiles)
        const recentActivity: any[] = [];

        // Look for any visible posts or activities
        $('.feed-shared-text, .pv-entity__summary-info, .pv-entity__description').each((i, el) => {
          if (i < 3) { // Limit to 3 items
            const text = $(el).text().trim();
            if (text && text.length > 10) {
              recentActivity.push({
                id: `activity-${i}`,
                content: text.substring(0, 200), // Limit length
                type: 'post',
                date: new Date().toISOString().split('T')[0],
                hasComment: true
              });
            }
          }
        });

        // If we found some activity, return it
        if (recentActivity.length > 0) {
          return {
            name,
            headline,
            location,
            recentActivity,
            lastUpdated: new Date().toISOString(),
            note: 'Scraped from public LinkedIn profile'
          };
        }

      } catch (urlError) {
        console.log(`Failed to scrape ${url}:`, urlError instanceof Error ? urlError.message : 'Unknown error');
        continue;
      }
    }

    // If all URLs failed, return null
    return null;

  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    return null;
  }
}

