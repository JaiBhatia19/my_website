import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Jai Bhatia'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back button */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/writing" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Writing
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            5 min read
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-muted-foreground">
              Written by <strong>Jai Bhatia</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Sales Engineer & AI Solutions Architect
            </p>
          </div>
          <Button asChild>
            <Link href="/contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}
