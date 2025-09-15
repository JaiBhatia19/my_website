import fs from 'fs/promises';
import path from 'path';

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
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const titleMatch = frontmatter.match(/title:\s*(.+)/);
          const descriptionMatch = frontmatter.match(/description:\s*(.+)/);
          const dateMatch = frontmatter.match(/date:\s*(.+)/);
          const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
          
          posts.push({
            slug,
            title: titleMatch?.[1] || 'Untitled',
            description: descriptionMatch?.[1] || '',
            date: dateMatch?.[1] || new Date().toISOString(),
            content: content.replace(/^---\n[\s\S]*?\n---\n/, ''),
            tags: tagsMatch?.[1]?.split(',').map(tag => tag.trim()) || []
          });
        }
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
