#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';
import pdf from 'pdf-parse';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Octokit } from '@octokit/rest';

// Types
interface ProfileData {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  awards: string[];
}

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

interface ProjectData {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  createdAt: string;
}

// Resume parsing function
async function parseResume(): Promise<Partial<ProfileData>> {
  console.log('📄 Parsing resume...');
  
  // Since we have the resume text, we'll parse it directly
  const resumeText = `JAI BHATIA
Los Angeles, CA • jaibhatia1906@gmail.com • (619) 866-5632 • linkedin.com/in/jaibhatia19
PROFESSIONAL EXPERIENCE
W ATERMELON SOFTW ARE INC. Los Angeles, CA
Sales Engineer Oct 2024 - Present
AI-powered test automation platform helping companies ship faster and avoid downtime.
●
Led 30+ discovery sessions with executives, IT, and business teams to uncover needs and design tailored technical
solutions for banks, insurance, and reseller verticals.
●
Partnered with product, engineering, and delivery teams to map customer pain points, translate requirements into
technical execution, and align teams around shared priorities.
●
Built reusable demo kits, interactive Storylane walkthroughs, and Loom explainers, reducing prep time by 30% and
improving communication of complex features.
●
Captured and analyzed client requirements to inform roadmap planning and create scalable solution designs that
addressed recurring industry challenges.
●
Synthesized insights from client and prospect conversations, directly shaping three new product features and guiding
go-to-market strategy decisions.
●
Engaged with industry leaders at software testing and QA conferences, uncovering emerging market trends and
identifying opportunities for collaboration and innovation.
●
Supported implementation and partner pilots, ensuring smooth onboarding and technical handoffs across
cross-functional teams.
W ATERMELON SOFTW ARE INC. Los Angeles, CA
Data Scientist Sep 2023 - Oct 2024
Joined the ML R&D team, building QA automation and management tools for the enterprise.
●
Collaborated with engineering and research teams to launch a screen classification model, raising element detection
accuracy on QA test steps by 20%.
●
Co-developed a test case prioritization engine, reducing regression suite runtime by 25% for enterprise customers.
●
Supported prototyping of GenAI test case writers (LangChain, RAG) to generate automated QA flows from
product specs, accelerating test authoring and release cycles.
●
W orked across QA, product, and customer-facing groups to ship ML features that were adopted internally and by
customers, improving reliability in large testing orgs.
EDUCATION
UC SAN DIEGO, RADY SCHOOL OF MANAGEMENT San Diego, CA
M.S. in Business Analytics July 2022 - June 2023
●
Academic Fellowship Recipient
●
Capstone: Data Analyst at sway.ai - Built influencer detection system using NLP and social graph analytics (Python,
T ableau, Y ouTube API); improved sentiment analysis for 10M+ posts by 30%.
●
Coursework: Business Intelligence, SQL & ETL, Scalable Analytics, Customer Analytics, Product Lifecycle, Applied
Market Research (Github)
UC SAN DIEGO San Diego, CA
B.S. in Mathematics & Economics; Minor in Business Sep 2018 - Jun 2022
ADDITIONAL INFORMATION
●
T echnical: Python, SQL, OpenAI API, A WS (Lambda, S3, EC2), n8n, Postman
●
T ools: HubSpot, Sales Navigator, Notion, Jira, Confluence, Swagger, LangChain, Hugging Face, Storylane, Loom
●
Certifications: A WS Partner Accreditation (T echnical), A WS T echnical Essentials, A WS SAA (Aug 2025)
●
Awards: Promoted within 1 year; recognized by CEO & Product team for impact on roadmap and go-to-market
●
Strengths: Demo prototyping, technical storytelling, quant-driven decision making, cross-team execution, direct
executive and operator engagement`;

  const lines = resumeText.split('\n').map(line => line.trim()).filter(line => line);
  
  const profile: Partial<ProfileData> = {
    name: 'Jai Bhatia',
    headline: 'Sales Engineer and AI-minded Solutions Architect building useful products',
    location: 'Los Angeles, CA',
    email: 'jaibhatia1906@gmail.com',
    phone: '(619) 866-5632',
    linkedin: 'https://www.linkedin.com/in/jaibhatia19/',
    github: 'https://github.com/JaiBhatia19',
    summary: 'AI-powered solutions architect with expertise in test automation, data science, and technical sales. Led 30+ discovery sessions, built ML models that improved accuracy by 20%, and directly influenced product roadmap decisions.',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    awards: []
  };

  // Parse experience
  const experience: Experience[] = [
    {
      company: 'Watermelon Software Inc.',
      position: 'Sales Engineer',
      location: 'Los Angeles, CA',
      startDate: 'Oct 2024',
      endDate: 'Present',
      current: true,
      description: 'AI-powered test automation platform helping companies ship faster and avoid downtime.',
      achievements: [
        'Led 30+ discovery sessions with executives, IT, and business teams to uncover needs and design tailored technical solutions for banks, insurance, and reseller verticals',
        'Partnered with product, engineering, and delivery teams to map customer pain points, translate requirements into technical execution, and align teams around shared priorities',
        'Built reusable demo kits, interactive Storylane walkthroughs, and Loom explainers, reducing prep time by 30% and improving communication of complex features',
        'Captured and analyzed client requirements to inform roadmap planning and create scalable solution designs that addressed recurring industry challenges',
        'Synthesized insights from client and prospect conversations, directly shaping three new product features and guiding go-to-market strategy decisions',
        'Engaged with industry leaders at software testing and QA conferences, uncovering emerging market trends and identifying opportunities for collaboration and innovation',
        'Supported implementation and partner pilots, ensuring smooth onboarding and technical handoffs across cross-functional teams'
      ],
      technologies: ['Python', 'SQL', 'AWS', 'LangChain', 'Storylane', 'Loom', 'HubSpot', 'Sales Navigator']
    },
    {
      company: 'Watermelon Software Inc.',
      position: 'Data Scientist',
      location: 'Los Angeles, CA',
      startDate: 'Sep 2023',
      endDate: 'Oct 2024',
      current: false,
      description: 'Joined the ML R&D team, building QA automation and management tools for the enterprise.',
      achievements: [
        'Collaborated with engineering and research teams to launch a screen classification model, raising element detection accuracy on QA test steps by 20%',
        'Co-developed a test case prioritization engine, reducing regression suite runtime by 25% for enterprise customers',
        'Supported prototyping of GenAI test case writers (LangChain, RAG) to generate automated QA flows from product specs, accelerating test authoring and release cycles',
        'Worked across QA, product, and customer-facing groups to ship ML features that were adopted internally and by customers, improving reliability in large testing orgs'
      ],
      technologies: ['Python', 'Machine Learning', 'LangChain', 'RAG', 'AWS', 'MLOps']
    }
  ];

  // Parse education
  const education: Education[] = [
    {
      institution: 'UC San Diego, Rady School of Management',
      degree: 'M.S.',
      field: 'Business Analytics',
      location: 'San Diego, CA',
      startDate: 'July 2022',
      endDate: 'June 2023',
      achievements: [
        'Academic Fellowship Recipient',
        'Capstone: Data Analyst at sway.ai - Built influencer detection system using NLP and social graph analytics (Python, Tableau, YouTube API); improved sentiment analysis for 10M+ posts by 30%'
      ]
    },
    {
      institution: 'UC San Diego',
      degree: 'B.S.',
      field: 'Mathematics & Economics; Minor in Business',
      location: 'San Diego, CA',
      startDate: 'Sep 2018',
      endDate: 'Jun 2022'
    }
  ];

  // Parse skills and certifications
  const skills = [
    'Python', 'SQL', 'OpenAI API', 'AWS (Lambda, S3, EC2)', 'n8n', 'Postman',
    'HubSpot', 'Sales Navigator', 'Notion', 'Jira', 'Confluence', 'Swagger',
    'LangChain', 'Hugging Face', 'Storylane', 'Loom'
  ];

  const certifications = [
    'AWS Partner Accreditation (Technical)',
    'AWS Technical Essentials',
    'AWS SAA (Aug 2025)'
  ];

  const awards = [
    'Promoted within 1 year; recognized by CEO & Product team for impact on roadmap and go-to-market'
  ];

  profile.experience = experience;
  profile.education = education;
  profile.skills = skills;
  profile.certifications = certifications;
  profile.awards = awards;

  return profile;
}

// LinkedIn scraping function
async function scrapeLinkedIn(): Promise<Partial<ProfileData>> {
  console.log('🔗 Scraping LinkedIn...');
  
  try {
    const response = await axios.get('https://www.linkedin.com/in/jaibhatia19/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract basic info (this is a simplified version - real scraping would be more complex)
    const headline = $('h1.text-heading-xlarge').text().trim() || 'Sales Engineer and AI-minded Solutions Architect';
    const about = $('.pv-about-section .pv-about__summary-text').text().trim() || '';
    
    return {
      headline,
      summary: about || 'AI-powered solutions architect with expertise in test automation, data science, and technical sales.'
    };
  } catch (error) {
    console.warn('⚠️  LinkedIn scraping failed, using fallback data');
    return {
      headline: 'Sales Engineer and AI-minded Solutions Architect building useful products',
      summary: 'AI-powered solutions architect with expertise in test automation, data science, and technical sales.'
    };
  }
}

// GitHub scraping function
async function scrapeGitHub(): Promise<ProjectData[]> {
  console.log('🐙 Scraping GitHub...');
  
  try {
    const response = await axios.get('https://api.github.com/users/JaiBhatia19/repos?sort=updated&per_page=6', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'jai-bhatia-personal-site'
      }
    });
    
    const repos = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language || 'Other',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      createdAt: repo.created_at
    }));
    
    return repos;
  } catch (error) {
    console.warn('⚠️  GitHub API failed, using fallback data');
    return [
      {
        name: 'sample-project-1',
        description: 'AI-powered test automation platform',
        url: 'https://github.com/JaiBhatia19/sample-project-1',
        language: 'Python',
        stars: 15,
        forks: 3,
        topics: ['ai', 'testing', 'automation'],
        updatedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'sample-project-2',
        description: 'Data analysis and visualization toolkit',
        url: 'https://github.com/JaiBhatia19/sample-project-2',
        language: 'JavaScript',
        stars: 8,
        forks: 2,
        topics: ['data', 'visualization', 'analytics'],
        updatedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
}

// Main function
async function buildContent() {
  console.log('🚀 Building content...');
  
  try {
    // Parse resume
    const resumeData = await parseResume();
    
    // Scrape LinkedIn
    const linkedinData = await scrapeLinkedIn();
    
    // Scrape GitHub
    const githubData = await scrapeGitHub();
    
    // Merge data
    const profileData: ProfileData = {
      ...resumeData,
      ...linkedinData,
    } as ProfileData;
    
    // Ensure data directory exists
    await fs.mkdir('./data', { recursive: true });
    
    // Write profile data
    await fs.writeFile(
      './data/profile.json',
      JSON.stringify(profileData, null, 2)
    );
    
    // Write projects data
    await fs.writeFile(
      './data/projects.json',
      JSON.stringify(githubData, null, 2)
    );
    
    console.log('✅ Content built successfully!');
    console.log(`📊 Profile: ${profileData.experience?.length || 0} experiences, ${profileData.education?.length || 0} education entries`);
    console.log(`📦 Projects: ${githubData.length} repositories`);
    
  } catch (error) {
    console.error('❌ Error building content:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildContent();
}

export { buildContent, parseResume, scrapeLinkedIn, scrapeGitHub };
