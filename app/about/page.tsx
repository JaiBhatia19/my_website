import { Section, SectionHeader } from '@/components/server-section';
import { CustomCard } from '@/components/card';
import { getProfileData } from '@/lib/content';
import { Download, Award, GraduationCap, Code, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FallbackImage } from '@/components/fallback-image';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About',
  description: 'Learn more about my background, values, and the tools I use to build great products.',
};

export default async function AboutPage() {
  const profile = await getProfileData();

  return (
    <div className="space-y-16">
      {/* Bio Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="About Me"
            description="Building bridges between technology and business"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Photo */}
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <FallbackImage
                    src="/images/profile.jpg"
                    alt="Jai Bhatia"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                    sizes="(max-width: 768px) 128px, 128px"
                    quality={90}
                  />
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  I&apos;m a sales engineer and AI-minded solutions architect passionate about building 
                  products that solve real business problems. With a background in data science 
                  and technical sales, I specialize in translating complex technical concepts into 
                  clear business value.
                </p>
                <p>
                  My journey started in mathematics and economics, which gave me a strong foundation 
                  in analytical thinking. This led me to pursue a Master&apos;s in Business Analytics, 
                  where I learned to bridge the gap between data and business strategy.
                </p>
                <p>
                  Today, I work at the intersection of AI, automation, and enterprise software, 
                  helping companies ship faster and avoid downtime through intelligent solutions. 
                  I believe the best technology is invisible—it just works.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <CustomCard title="Quick Facts">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm">UC San Diego</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="text-sm">Python, SQL, AWS</span>
                  </div>
                </div>
              </CustomCard>
              
              <Button asChild className="w-full">
                <a href="/resume" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  View Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Values & Approach"
            description="The principles that guide my work"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomCard
              title="Human-Centered Design"
              description="Technology should serve people, not the other way around. I always start with the user's needs and work backwards to the technical solution."
            />
            <CustomCard
              title="Data-Driven Decisions"
              description="I believe in measuring what matters and making decisions based on evidence, not assumptions. Every feature should have a clear success metric."
            />
            <CustomCard
              title="Continuous Learning"
              description="The tech landscape changes rapidly. I stay curious and continuously learn new tools and techniques to stay ahead of the curve."
            />
            <CustomCard
              title="Collaborative Execution"
              description="The best solutions come from diverse teams working together. I thrive in cross-functional environments where different perspectives come together."
            />
          </div>
        </div>
      </Section>

      {/* Conference Experience Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Speaking & Community"
            description="Sharing knowledge and engaging with the tech community"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.conferenceExperience?.map((event: any, index: number) => (
              <CustomCard key={index} title={event.event}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {event.role}
                    </span>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">{event.topic}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills & Tools Section */}
      <Section className="bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Skills & Tools"
            description="Technologies and tools I use to build great products"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CustomCard title="Technical Skills">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Programming & Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 8).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Tools & Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(8).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CustomCard>
            
            <CustomCard title="Certifications & Awards">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <div className="space-y-2">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recognition</h4>
                  <div className="space-y-2">
                    {profile.awards.map((award, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Award className="h-4 w-4 text-primary mt-0.5" />
                        <span className="text-sm">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CustomCard>
          </div>
        </div>
      </Section>
    </div>
  );
}
