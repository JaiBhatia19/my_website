'use client';

import { Hero } from '@/components/hero';
import { Section, SectionHeader } from '@/components/section';
import { FeatureCard } from '@/components/card';
import { getProfileDataClient } from '@/lib/content-client';
import { useLiveData } from '@/lib/hooks/use-live-data';
import { useEffect, useState } from 'react';
import { 
  Wrench, 
  Brain, 
  Handshake, 
  Github, 
  Linkedin, 
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const { githubData, linkedinData } = useLiveData();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await getProfileDataClient();
      setProfile(profileData);
    };
    loadProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero profile={profile} />
      
      {/* What I Do Section */}
      <Section id="what-i-do">
        <SectionHeader
          title="What I Do"
          description="Building solutions that bridge the gap between technical possibilities and business needs"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wrench className="h-6 w-6" />}
            title="Solutions Engineering"
            description="Design and implement technical solutions that solve real business problems, from discovery to deployment."
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="AI Prototypes"
            description="Build rapid prototypes using AI and ML to validate ideas and demonstrate value to stakeholders."
          />
          <FeatureCard
            icon={<Handshake className="h-6 w-6" />}
            title="Partnerships"
            description="Foster strategic partnerships and technical integrations that drive mutual growth and innovation."
          />
        </div>
      </Section>

      {/* Live Activity Section */}
      <Section className="bg-muted/50">
        <SectionHeader
          title="Live Activity"
          description="What I'm working on right now"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href={githubData?.recentActivity?.[0]?.url || 'https://github.com/JaiBhatia19'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-200 hover:border-primary/50 group cursor-pointer h-32 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Github className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">Latest Commit</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {(() => {
                const commitMessage = githubData?.recentActivity?.[0]?.message || 'Enhanced demo automation with AI-powered test generation';
                // Filter out website-related commits and summarize
                if (commitMessage.toLowerCase().includes('website') || 
                    commitMessage.toLowerCase().includes('portfolio') ||
                    commitMessage.toLowerCase().includes('personal-site')) {
                  return 'Working on AI-powered automation solutions';
                }
                // Summarize long commit messages
                if (commitMessage.length > 60) {
                  return commitMessage.substring(0, 57) + '...';
                }
                return commitMessage;
              })()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {githubData?.recentActivity?.[0]?.timestamp 
                ? new Date(githubData.recentActivity[0].timestamp).toLocaleDateString()
                : '2 hours ago'
              }
            </p>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/jaibhatia19/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-200 hover:border-primary/50 group cursor-pointer h-32 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Linkedin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">Recent Post</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;{linkedinData?.recentPosts?.[0] || 'The future of QA is AI-powered, but human insight remains irreplaceable'}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
          </a>
          
          <a 
            href={githubData?.projects?.[0]?.url || 'https://github.com/JaiBhatia19'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-200 hover:border-primary/50 group cursor-pointer h-32 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">Project Update</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {(() => {
                const projectDesc = githubData?.projects?.[0]?.description || 'Launched new ML model improving test accuracy by 20%';
                // Filter out website-related projects
                if (projectDesc.toLowerCase().includes('website') || 
                    projectDesc.toLowerCase().includes('portfolio') ||
                    projectDesc.toLowerCase().includes('personal-site')) {
                  return 'Building AI-powered customer feedback analysis tools';
                }
                return projectDesc;
              })()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {githubData?.projects?.[0]?.lastUpdated 
                ? new Date(githubData.projects[0].lastUpdated).toLocaleDateString()
                : '3 days ago'
              }
            </p>
          </a>
        </div>
      </Section>

      {/* Skills Section */}
      <Section>
        <SectionHeader
          title="Technical Expertise"
          description="Building solutions with cutting-edge technologies"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="font-semibold mb-4 flex items-center">
              <Brain className="h-5 w-5 text-primary mr-2" />
              AI & Machine Learning
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.additionalSkills?.ai_ml?.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="font-semibold mb-4 flex items-center">
              <Wrench className="h-5 w-5 text-primary mr-2" />
              Development Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.additionalSkills?.frameworks?.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              Cloud & DevOps
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.additionalSkills?.cloud?.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Personal Projects Section */}
      <Section className="bg-muted/50">
        <SectionHeader
          title="Featured Projects"
          description="Hands-on projects that demonstrate real-world impact"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.personalProjects?.map((project: any, index: number) => (
            <div key={index} className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {project.status}
                  </span>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <span key={techIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-1 text-sm">
                {project.achievements.slice(0, 2).map((achievement: string, achIndex: number) => (
                  <li key={achIndex} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Social Proof Section */}
      <Section>
        <SectionHeader
          title="Impact Metrics"
          description="Quantifiable results from my work"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">30+</div>
            <div className="text-sm text-muted-foreground">Discovery Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">20%</div>
            <div className="text-sm text-muted-foreground">ML Accuracy Improvement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">25%</div>
            <div className="text-sm text-muted-foreground">Runtime Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">3</div>
            <div className="text-sm text-muted-foreground">Product Features Shipped</div>
          </div>
        </div>
      </Section>
    </>
  );
}
