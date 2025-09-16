import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export interface ProfileData {
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
  personalProjects?: PersonalProject[];
  conferenceExperience?: ConferenceExperience[];
  additionalSkills?: AdditionalSkills;
}

export interface PersonalProject {
  name: string;
  description: string;
  url: string;
  technologies: string[];
  status: string;
  achievements: string[];
}

export interface ConferenceExperience {
  event: string;
  role: string;
  date: string;
  location: string;
  topic: string;
  description: string;
}

export interface AdditionalSkills {
  languages: string[];
  frameworks: string[];
  cloud: string[];
  ai_ml: string[];
  tools: string[];
  databases: string[];
}

export interface Experience {
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

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface ProjectData {
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

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  tags: string[];
}

let profileCache: ProfileData | null = null;
let projectsCache: ProjectData[] | null = null;

export async function getProfileData(): Promise<ProfileData> {
  if (profileCache) return profileCache;
  
  try {
    const data = await fs.readFile(path.join(process.cwd(), 'data', 'profile.json'), 'utf-8');
    profileCache = JSON.parse(data);
    return profileCache!;
  } catch (error) {
    console.error('Error loading profile data:', error);
    throw new Error('Profile data not found. Run `pnpm run build-content` first.');
  }
}

export async function getProjectsData(): Promise<ProjectData[]> {
  if (projectsCache) return projectsCache;
  
  try {
    const data = await fs.readFile(path.join(process.cwd(), 'data', 'projects.json'), 'utf-8');
    projectsCache = JSON.parse(data);
    return projectsCache!;
  } catch (error) {
    console.error('Error loading projects data:', error);
    throw new Error('Projects data not found. Run `pnpm run build-content` first.');
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  
  try {
    const files = await fs.readdir(postsDir);
    const posts: BlogPost[] = [];
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        // Parse frontmatter and content using gray-matter
        const { data: frontmatter, content: markdownContent } = matter(fileContent);
        
        // Process markdown to HTML
        const processedContent = await remark()
          .use(remarkGfm)
          .use(remarkHtml, { sanitize: false })
          .process(markdownContent);
        
        let htmlContent = processedContent.toString();
        
        // Remove the first h1 tag since the title is already displayed in the page header
        htmlContent = htmlContent.replace(/<h1[^>]*>.*?<\/h1>/s, '');
        
        posts.push({
          slug,
          title: (frontmatter.title || 'Untitled').replace(/^["']|["']$/g, ''),
          description: (frontmatter.description || '').replace(/^["']|["']$/g, ''),
          date: frontmatter.date || new Date().toISOString(),
          content: htmlContent,
          tags: frontmatter.tags || []
        });
      }
    }
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}
