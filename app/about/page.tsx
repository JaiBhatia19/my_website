import { Section, SectionHeader } from '@/components/server-section';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About',
  description: 'Learn more about my background, values, and the tools I use to build great products.',
};

export default async function AboutPage() {
  return (
    <div className="space-y-16">
      <Section>
        <SectionHeader
          title="About Me"
          description="Learn more about my background, values, and the tools I use to build great products."
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p>
              I&apos;m a customer-facing technologist specializing in technical sales and applied AI, 
              with experience designing enterprise solutions and delivering over 30 virtual demos for 
              banking and insurance clients. I leverage automation and AI-enabled workflows to advance 
              sales opportunities and generate qualified meetings across digital channels.
            </p>
            
            <p>
              I work closely with marketing and ecosystem teams, translating customer needs into 
              pilots and product enhancements—from technical discovery and proof-of-concept design 
              to production-grade automation and ML features in enterprise environments.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}