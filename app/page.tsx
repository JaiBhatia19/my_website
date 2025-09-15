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
  const { linkedinData } = useLiveData();
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
          description="Turning ideas into reality with a mix of technical chops and business sense"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wrench className="h-6 w-6" />}
            title="Solutions Engineering"
            description="Crafting technical solutions that actually work in the real world. No buzzwords, just results."
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="AI & Vibe Coding"
            description="Building AI-powered tools that solve real problems. Think SignalNote, not another ChatGPT wrapper."
          />
          <FeatureCard
            icon={<Handshake className="h-6 w-6" />}
            title="Strategic Partnerships"
            description="Connecting the dots between tech and business to create win-win scenarios."
          />
        </div>
      </Section>

      {/* Live Activity Section */}
      <Section className="bg-muted/50">
        <SectionHeader
          title="Live Activity"
          description="Latest thoughts and insights"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="https://www.linkedin.com/in/jaibhatia19/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-200 hover:border-primary/50 group cursor-pointer h-32 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Linkedin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">Latest Post</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;{linkedinData?.recentPosts?.[0] || 'The future of QA is AI-powered, but human insight remains irreplaceable'}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/jaibhatia19/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-200 hover:border-primary/50 group cursor-pointer h-32 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Brain className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">AI Insights</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;Building AI tools that actually solve real problems, not just demos&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">3 days ago</p>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/jaibhatia19/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-200 hover:border-primary/50 group cursor-pointer h-32 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">Industry Thoughts</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;The best solutions come from understanding both the tech and the business&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">5 days ago</p>
          </a>
        </div>
      </Section>

      {/* Skills Section */}
      <Section>
        <SectionHeader
          title="Technical Expertise"
          description="The tools and tech I use to turn coffee into code"
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
          description="Real projects, real impact. No fluff, just results."
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
