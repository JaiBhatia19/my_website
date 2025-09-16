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
        description="Latest thoughts and insights from LinkedIn"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Show 3 most recent LinkedIn activities with smart presentation */}
        {[0, 1, 2].map((index) => {
          const activity = linkedinData?.recentActivity?.[index];
          
          // Filter out reposts without comments (only for activity objects)
          if (activity && activity.type === 'repost' && !activity.hasComment) {
            return null;
          }

          // Smart content presentation based on the actual post
          const getSmartContent = (content: string, index: number) => {
            // Check for specific content patterns in order of priority
            if (content.includes('NotebookLM') || content.includes('neural networks') || content.includes('AI fundamentals')) {
              return {
                title: 'AI Education',
                summary: 'Built an AI fundamentals shortcut using NotebookLM - condensed best AI videos into digestible 30-min podcast and 8-min highlights for busy professionals.',
                icon: Brain
              };
            }
            if (content.includes('SignalNote')) {
              return {
                title: 'Product Launch',
                summary: 'Launched SignalNote - AI-powered customer feedback analysis tool that transforms messy data into actionable insights.',
                icon: TrendingUp
              };
            }
            if (content.includes('Olivia Gambelin') && content.includes('CAST 2025')) {
              return {
                title: 'Industry Insight',
                summary: 'Shared insights from CAST 2025 on responsible AI in testing - emphasizing that real progress comes from human expertise.',
                icon: Brain
              };
            }
            if (content.includes('language modeling') && content.includes('grounding') && content.includes('vibes at scale')) {
              return {
                title: 'Tech Perspective',
                summary: 'Reflecting on AI limitations - language models without grounding are just "vibes at scale." The real frontier is understanding.',
                icon: Brain
              };
            }
            if (content.includes('Come find us') && content.includes('CAST2025')) {
              return {
                title: 'Conference Update',
                summary: 'Excited to be at CAST 2025 - connecting with the testing community and sharing insights on AI in testing.',
                icon: TrendingUp
              };
            }
            if (content.includes('AWS') || content.includes('Q Builder')) {
              return {
                title: 'Industry Event',
                summary: 'Attended AWS Q Builder Day in LA - hands-on experience with GenAI assistants and enterprise AI integration.',
                icon: TrendingUp
              };
            }
            if (content.includes('Jason Huggins') || content.includes('Selenium')) {
              return {
                title: 'Industry Connection',
                summary: 'Met Jason Huggins, founder of Selenium - connecting with pioneers who built the testing tools we use today.',
                icon: Linkedin
              };
            }
            if (content.includes('Test Automation') || content.includes('automation')) {
              return {
                title: 'Expertise Share',
                summary: 'Shared insights on test automation challenges - why 80% of teams fail and how no-code approaches democratize testing.',
                icon: Brain
              };
            }
            if (content.includes('SRE') || content.includes('reliability')) {
              return {
                title: 'Technical Insight',
                summary: 'Discussed SRE best practices - why measuring uptime instead of customer success rates sets teams up for failure.',
                icon: TrendingUp
              };
            }
            
            // Default fallback based on index to ensure unique content
            const defaultContent = [
              {
                title: 'Professional Insight',
                summary: 'Sharing professional insights and industry perspectives on LinkedIn.',
                icon: Brain
              },
              {
                title: 'Industry Update',
                summary: 'Latest thoughts on technology trends and industry developments.',
                icon: TrendingUp
              },
              {
                title: 'Technical Thought',
                summary: 'Technical insights and professional observations from the field.',
                icon: Linkedin
              }
            ];
            
            return defaultContent[index] || defaultContent[0];
          };

          const smartContent = getSmartContent(activity?.content || '', index);
          const SmartIcon = smartContent.icon;
          
          return (
            <a 
              key={index}
              href="https://www.linkedin.com/in/jaibhatia19/recent-activity/all/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-200 hover:border-primary/50 group cursor-pointer h-40 flex flex-col justify-between"
            >
              <div className="flex items-center space-x-3 mb-3">
                <SmartIcon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm">
                  {smartContent.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                {smartContent.summary}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-muted-foreground">
                  {activity?.date ? new Date(activity.date).toLocaleDateString() : 
                   `${index + 1} day${index > 0 ? 's' : ''} ago`}
                </p>
                <span className="text-xs text-primary group-hover:text-primary/80 transition-colors">
                  View on LinkedIn →
                </span>
              </div>
            </a>
          );
        })}
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
