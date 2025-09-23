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
              I&apos;m a sales engineer and AI-minded solutions architect passionate about building 
              products that solve real problems. With experience in both technical implementation 
              and customer-facing roles, I bridge the gap between complex technology and business value.
            </p>
            
            <p>
              My approach combines deep technical knowledge with strong communication skills, 
              allowing me to translate complex concepts into clear, actionable solutions for 
              customers and stakeholders.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}