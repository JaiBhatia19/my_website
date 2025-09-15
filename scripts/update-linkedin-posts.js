#!/usr/bin/env node

/**
 * LinkedIn Posts Update Script
 * Simple script to add new LinkedIn posts to your website
 * 
 * Usage:
 * node scripts/update-linkedin-posts.js "Your post content here"
 * 
 * Or with type:
 * node scripts/update-linkedin-posts.js "Your post content here" "post"
 */

const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'data', 'linkedin-posts.json');

function updateLinkedInPosts(newPostContent, type = 'post', hasComment = true) {
  try {
    // Read existing posts
    const data = fs.readFileSync(postsPath, 'utf8');
    const postsData = JSON.parse(data);

    // Create new post object
    const newPost = {
      id: String(Date.now()), // Use timestamp as unique ID
      content: newPostContent,
      type: type,
      date: new Date().toISOString().split('T')[0], // Today's date
      hasComment: hasComment
    };

    // Add to the beginning of the posts array (most recent first)
    postsData.posts.unshift(newPost);

    // Keep only the most recent 10 posts to avoid bloat
    if (postsData.posts.length > 10) {
      postsData.posts = postsData.posts.slice(0, 10);
    }

    // Write back to file
    fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2), 'utf8');
    
    console.log('✅ LinkedIn posts updated successfully!');
    console.log('📝 New post added:', newPost);
    console.log(`📊 Total posts: ${postsData.posts.length}`);
    console.log('🌐 Your website will now show this as the most recent post!');
    
  } catch (error) {
    console.error('❌ Error updating LinkedIn posts:', error.message);
    console.log('💡 Make sure the data/linkedin-posts.json file exists');
  }
}

function showHelp() {
  console.log(`
📝 LinkedIn Posts Update Script

Usage:
  node scripts/update-linkedin-posts.js "Your post content here"
  node scripts/update-linkedin-posts.js "Your post content here" "post_type"
  node scripts/update-linkedin-posts.js "Your post content here" "post_type" true/false

Examples:
  node scripts/update-linkedin-posts.js "Excited to share my latest AI insights!"
  node scripts/update-linkedin-posts.js "Great article on tech trends!" "comment"
  node scripts/update-linkedin-posts.js "Shared this amazing post" "repost" true

Post Types:
  - post: Regular LinkedIn post
  - comment: Comment on someone's post
  - repost: Sharing someone else's content
  - article: Article you wrote
  - insight: Professional insight or thought

The script will:
  ✅ Add your post to the top of the list
  ✅ Keep only the 10 most recent posts
  ✅ Update your website's Live Activity section
  ✅ Filter out reposts without comments automatically

💡 Pro Tip: Add new posts whenever you publish something on LinkedIn!
`);
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  showHelp();
  process.exit(0);
}

const postContent = args[0];
const postType = args[1] || 'post';
const hasComment = args[2] !== 'false'; // Default to true unless explicitly set to false

if (!postContent || postContent.trim().length === 0) {
  console.error('❌ Please provide post content');
  showHelp();
  process.exit(1);
}

// Update the posts
updateLinkedInPosts(postContent, postType, hasComment);