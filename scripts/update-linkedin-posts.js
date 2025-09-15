#!/usr/bin/env node

/**
 * Script to update LinkedIn posts in the data file
 * Usage: node scripts/update-linkedin-posts.js
 */

const fs = require('fs').promises;
const path = require('path');

const POSTS_FILE = path.join(__dirname, '..', 'data', 'linkedin-posts.json');

async function updateLinkedInPosts() {
  try {
    // Read current posts
    const postsData = JSON.parse(await fs.readFile(POSTS_FILE, 'utf-8'));
    
    console.log('📝 Current LinkedIn Posts:');
    postsData.posts.slice(0, 3).forEach((post, index) => {
      console.log(`${index + 1}. [${post.type}] ${post.content}`);
      console.log(`   Date: ${post.date}`);
    });
    
    console.log('\n💡 To update posts:');
    console.log('1. Edit data/linkedin-posts.json');
    console.log('2. Add new posts to the beginning of the posts array');
    console.log('3. Update the lastUpdated timestamp');
    console.log('4. Posts will rotate daily automatically');
    
    console.log('\n📊 Post Types Available:');
    console.log('- insight: General professional insights');
    console.log('- ai_insight: AI/ML related thoughts');
    console.log('- industry_thought: Industry observations');
    console.log('- project_update: Project announcements');
    console.log('- personal: Personal/professional updates');
    
  } catch (error) {
    console.error('❌ Error reading LinkedIn posts:', error);
  }
}

updateLinkedInPosts();
