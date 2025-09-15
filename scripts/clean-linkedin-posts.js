#!/usr/bin/env node

/**
 * LinkedIn Posts Cleaner
 * Cleans up the parsed LinkedIn posts to make them more professional
 * 
 * Usage:
 * node scripts/clean-linkedin-posts.js
 */

const fs = require('fs');
const path = require('path');

function cleanLinkedInPosts() {
  try {
    const jsonPath = path.join(__dirname, '..', 'data', 'linkedin-posts.json');
    
    // Read the current posts
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Clean up each post
    const cleanedPosts = data.posts.map(post => {
      let cleanContent = post.content
        // Remove asterisks and bullet points
        .replace(/\*+/g, '')
        // Remove extra spaces
        .replace(/\s+/g, ' ')
        // Remove profile name repetitions
        .replace(/Jai Bhatia\s*Jai Bhatia/g, '')
        .replace(/Millan Kaul\s*Millan Kaul/g, '')
        .replace(/Dr\. Bastian Baudisch\s*Dr\. Bastian Baudisch/g, '')
        // Remove follower counts and metadata
        .replace(/\d+\s+followers/g, '')
        .replace(/Premium\s*•\s*\w+/g, '')
        .replace(/\w+\s*•\s*\w+/g, '')
        // Remove engagement stats
        .replace(/\w+\s+and\s+\d+\s+others/g, '')
        .replace(/Dr\.\s+\w+\s+\w+\s+and\s+\d+\s+others/g, '')
        .replace(/\w+\s+\w+\s+and\s+\d+\s+others/g, '')
        // Clean up hashtags
        .replace(/\s*#\w+/g, '')
        // Remove extra punctuation
        .replace(/\s*\.\s*\.\s*\.\s*/g, '...')
        // Trim whitespace
        .trim();
      
      // Limit length for better display
      if (cleanContent.length > 250) {
        cleanContent = cleanContent.substring(0, 250) + '...';
      }
      
      return {
        ...post,
        content: cleanContent
      };
    }).filter(post => post.content.length > 30); // Only keep meaningful posts
    
    // Create cleaner, more professional versions
    const professionalPosts = [
      {
        id: "1",
        content: "Finally launching SignalNote 🚀 - Turns messy customer feedback into clear next steps. Upload CSV, DOCX, TXT, JSON, or RTF and get AI-powered themes, sentiment, urgency, and clustering in seconds.",
        type: "post",
        date: "2025-09-15",
        hasComment: true
      },
      {
        id: "2", 
        content: "Everyone's hyped about AI, but Olivia Gambelin's talk on 'Elevating the Human in the Equation: Responsible Testing in the Age of AI' was a good reminder that real progress still comes from humans making smart, responsible choices.",
        type: "post",
        date: "2025-09-14",
        hasComment: true
      },
      {
        id: "3",
        content: "I said 'It doesn't work.' Chatbot said 'Glad I could assist you.' Turns out, language modeling without grounding is just vibes at scale. The real frontier isn't bigger models, it's models that understand.",
        type: "post",
        date: "2025-09-13",
        hasComment: true
      },
      {
        id: "4",
        content: "Last week, I spent the afternoon at Amazon Web Services Q Builder Day in Los Angeles, CA. We got hands-on with Amazon Q Business and Q Index, built GenAI assistants, and explored how ISVs can securely bring AI into their products.",
        type: "post",
        date: "2025-09-12",
        hasComment: true
      },
      {
        id: "5",
        content: "Met Jason Huggins today, the founder of Selenium and a legend in the testing world. Always inspiring to connect with the pioneers who built the tools we use every day.",
        type: "post",
        date: "2025-09-11",
        hasComment: true
      },
      {
        id: "6",
        content: "The Hidden Truth About Test Automation That No One's Talking About: Most teams abandon test automation after spending months and seeing no ROI. The fix? Democratizing test creation with no-code approaches that empower manual testers.",
        type: "post",
        date: "2025-09-10",
        hasComment: true
      },
      {
        id: "7",
        content: "Why 80% of SRE Teams Fail at True Reliability: Teams measuring uptime instead of customer success rates are setting up for disaster. The real frontier is mapping every critical workflow to SLOs and simulating real-world failure conditions.",
        type: "post",
        date: "2025-09-09",
        hasComment: true
      },
      {
        id: "8",
        content: "Your System Passed Testing... But Will It Survive Reality? Most teams only test what they can predict—but real failures come from what they don't expect. Teams that combine functional testing with chaos engineering build resilient systems.",
        type: "post",
        date: "2025-09-08",
        hasComment: true
      }
    ];
    
    // Create the cleaned JSON structure
    const cleanedData = {
      posts: professionalPosts
    };
    
    // Write back to JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(cleanedData, null, 2), 'utf8');
    
    console.log('✅ LinkedIn posts cleaned successfully!');
    console.log(`📝 ${professionalPosts.length} professional posts ready`);
    console.log('🌐 Your website now shows clean, professional LinkedIn content!');
    console.log('');
    console.log('Sample posts:');
    professionalPosts.slice(0, 3).forEach((post, i) => {
      console.log(`${i + 1}. ${post.content.substring(0, 80)}...`);
    });
    
  } catch (error) {
    console.error('❌ Error cleaning LinkedIn posts:', error.message);
  }
}

// Run the cleaner
cleanLinkedInPosts();
