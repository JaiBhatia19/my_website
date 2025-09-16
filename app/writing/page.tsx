import { Section, SectionHeader } from '@/components/section';
import { CustomCard } from '@/components/card';
import { getBlogPosts } from '@/lib/content';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Writing',
  description: 'Thoughts on sales engineering, AI, and building products that matter.',
};

export default async function WritingPage() {
  const posts = await getBlogPosts();

  return (
    <Section>
      <SectionHeader
        title="Writing"
        description="Thoughts on sales engineering, AI, and building products that matter"
      />
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <CustomCard
              key={post.slug}
              title={post.title}
              description={post.description}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    5 min read
                  </div>
                </div>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <Link
                  href={`/writing/${post.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1"
                >
                  Read more
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CustomCard>
          ))}
        </div>
      )}
    </Section>
  );
}
