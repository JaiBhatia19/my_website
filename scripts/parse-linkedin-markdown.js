#!/usr/bin/env node

/**
 * LinkedIn Markdown Parser
 * Converts your linkedin-posts.md file to the proper JSON format
 * 
 * Usage:
 * node scripts/parse-linkedin-markdown.js
 */

const fs = require('fs');
const path = require('path');

function parseLinkedInMarkdown() {
  try {
    const markdownPath = path.join(__dirname, '..', 'data', 'linkedin-posts.md');
    const jsonPath = path.join(__dirname, '..', 'data', 'linkedin-posts.json');
    
    // Read the markdown file
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Parse the content to extract posts
    const posts = [];
    const sections = markdownContent.split('## LINKEDIN POST');
    
    // Remove the first section (header content)
    sections.shift();
    
    sections.forEach((section, index) => {
      if (section.trim().length === 0) return;
      
      // Extract the main content
      const lines = section.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      // Find the main post content (skip profile links, dates, etc.)
      let content = '';
      let isContent = false;
      let hasComment = false;
      let postType = 'post';
      
      for (const line of lines) {
        // Skip profile links and metadata
        if (line.includes('Jai Bhatia') && line.includes('linkedin.com')) continue;
        if (line.includes('•') && (line.includes('d •') || line.includes('mo •') || line.includes('yr •'))) continue;
        if (line.includes('Visible to anyone')) continue;
        if (line.includes('Premium • You')) continue;
        if (line.includes('Sales Engineer |')) continue;
        if (line.includes('reposted this')) {
          postType = 'repost';
          continue;
        }
        
        // Check if this is actual content
        if (line.length > 20 && !line.includes('hashtag') && !line.includes('Like') && !line.includes('Comment') && !line.includes('Repost') && !line.includes('Send') && !line.includes('impressions') && !line.includes('View analytics') && !line.includes('Activate to view')) {
          if (!isContent && line.length > 30) {
            isContent = true;
          }
          
          if (isContent) {
            // Clean up the content
            let cleanLine = line
              .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links, keep text
              .replace(/\\#/g, '#') // Fix escaped hashtags
              .replace(/\\!/g, '!') // Fix escaped exclamation marks
              .trim();
            
            if (cleanLine.length > 10) {
              content += cleanLine + ' ';
            }
          }
        }
      }
      
      // Clean up and limit content
      content = content.trim();
      if (content.length > 300) {
        content = content.substring(0, 300) + '...';
      }
      
      // Only add if we have meaningful content
      if (content.length > 20) {
        // Check if it's a repost without meaningful comment
        if (postType === 'repost' && content.length < 50) {
          hasComment = false;
        } else {
          hasComment = true;
        }
        
        posts.push({
          id: String(index + 1),
          content: content,
          type: postType,
          date: getRecentDate(index), // Generate recent dates
          hasComment: hasComment
        });
      }
    });
    
    // Create the JSON structure
    const jsonData = {
      posts: posts.slice(0, 8) // Keep only the 8 most recent posts
    };
    
    // Write to JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');
    
    console.log('✅ LinkedIn posts parsed successfully!');
    console.log(`📝 Found ${posts.length} posts`);
    console.log(`📊 Converted to JSON format`);
    console.log(`🌐 Your website will now show these real LinkedIn posts!`);
    console.log('');
    console.log('Recent posts:');
    posts.slice(0, 3).forEach((post, i) => {
      console.log(`${i + 1}. ${post.content.substring(0, 100)}...`);
    });
    
  } catch (error) {
    console.error('❌ Error parsing LinkedIn markdown:', error.message);
  }
}

function getRecentDate(index) {
  const today = new Date();
  const daysAgo = index;
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

// Run the parser
parseLinkedInMarkdown();
