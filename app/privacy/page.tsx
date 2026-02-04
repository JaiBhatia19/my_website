import { Section, SectionHeader } from '@/components/server-section';

export const metadata = {
  title: 'Privacy',
  description: 'Privacy policy for jaibhatia.dev',
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeader
        title="Privacy"
        description="How this site handles your information"
      />
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <p>
          This site does not collect personal data beyond what you submit via the contact form (email and message).
          That information is used only to respond to you and is not shared with third parties. The site may use
          standard analytics or hosting logs; no advertising or tracking is used.
        </p>
        <p>
          For questions, contact me via the contact page or email on the site.
        </p>
      </div>
    </Section>
  );
}
