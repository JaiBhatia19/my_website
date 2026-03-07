import { Section, SectionHeader } from '@/components/server-section';
import { Timeline } from '@/components/timeline';
import { getProfileData } from '@/lib/content';

export const metadata = {
  title: 'Experience',
  description: 'Senior Solutions Engineer at Watermelon Software. Data Scientist, Sway.AI. Pre-sales, MEDDIC discovery, POC scoping, demo engineering.',
};

export default async function ExperiencePage() {
  const profile = await getProfileData();

  return (
    <Section>
        <SectionHeader
          title="Professional Experience"
          description="Pre-sales, data science, and AI—from Watermelon Software to Sway.AI"
        />
      
      <Timeline experiences={profile.experience} />
    </Section>
  );
}
