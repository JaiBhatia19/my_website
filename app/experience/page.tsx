import { Section, SectionHeader } from '@/components/server-section';
import { Timeline } from '@/components/timeline';
import { getProfileData } from '@/lib/content';

export const metadata = {
  title: 'Experience',
  description: 'My professional journey in sales engineering, data science, and AI solutions.',
};

export default async function ExperiencePage() {
  const profile = await getProfileData();

  return (
    <Section>
      <SectionHeader
        title="Professional Experience"
        description="Building solutions that drive business value through technology"
      />
      
      <Timeline experiences={profile.experience} />
    </Section>
  );
}
