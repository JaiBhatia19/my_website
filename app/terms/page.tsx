import { Section, SectionHeader } from '@/components/server-section';

export const metadata = {
  title: 'Terms',
  description: 'Terms of use for jaibhatia.dev',
};

export default function TermsPage() {
  return (
    <Section>
      <SectionHeader
        title="Terms of Use"
        description="Use of this website"
      />
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <p>
          This site is for personal and professional portfolio purposes. You may view and link to it freely.
          Content is provided as-is; do not copy or republish without permission. Contact me for any inquiries.
        </p>
      </div>
    </Section>
  );
}
