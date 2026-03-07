import { Section, SectionHeader } from '@/components/server-section';
import { getProfileData } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About',
  description: 'Senior Solutions Engineer with 2+ years driving pre-sales in FinTech and Insurance. MEDDIC discovery, demo engineering, POC scoping.',
};

export default async function AboutPage() {
  const profile = await getProfileData();

  return (
    <div className="space-y-16">
      <Section>
        <SectionHeader
          title="About Me"
          description="Senior Solutions Engineer driving pre-sales in FinTech and Insurance"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{profile.summary}</p>
            <p>
              I combine a data-science foundation—shipped ML to production, maintained 5M+ record/day pipelines—with modern GTM execution: MEDDIC discovery, outbound automation, and RAG-workflow architecture to compress POC timelines and accelerate ACV growth.
            </p>
            {profile.education?.length ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Education</h3>
                <ul className="space-y-2">
                  {profile.education.map((edu, i) => (
                    <li key={i}>
                      <strong>{edu.degree} {edu.field}</strong> — {edu.institution} ({edu.startDate} – {edu.endDate})
                      {edu.achievements?.length ? ` · ${edu.achievements.join(', ')}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </div>
  );
}