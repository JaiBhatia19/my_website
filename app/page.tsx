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
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center space-x-3 mb-3">
              <Github className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Latest Commit</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {githubData?.recentActivity?.[0]?.message || 'Enhanced demo automation with AI-powered test generation'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {githubData?.recentActivity?.[0]?.timestamp 
                ? new Date(githubData.recentActivity[0].timestamp).toLocaleDateString()
                : '2 hours ago'
              }
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center space-x-3 mb-3">
              <Linkedin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Recent Post</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;{linkedinData?.recentPosts?.[0] || 'The future of QA is AI-powered, but human insight remains irreplaceable'}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
          </div>
          
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Project Update</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {githubData?.projects?.[0]?.description || 'Launched new ML model improving test accuracy by 20%'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {githubData?.projects?.[0]?.lastUpdated 
                ? new Date(githubData.projects[0].lastUpdated).toLocaleDateString()
                : '3 days ago'
              }
            </p>
          </div>
        </div>
      </Section>

      {/* Social Proof Section */}
      <Section>
        <SectionHeader
          title="Trusted By"
          description="Working with industry leaders to build better software"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">30+</div>
            <div className="text-sm text-muted-foreground">Discovery Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">20%</div>
            <div className="text-sm text-muted-foreground">Accuracy Improvement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">25%</div>
            <div className="text-sm text-muted-foreground">Runtime Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">3</div>
            <div className="text-sm text-muted-foreground">Product Features</div>
          </div>
        </div>
      </Section>
    </>
  );
}
