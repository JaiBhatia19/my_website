'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { ProjectData } from '@/lib/content';
import { formatRelativeTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RepoCardProps {
  project: ProjectData;
  index: number;
}

export function RepoCard({ project, index }: RepoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {project.description || 'No description available'}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              {project.language}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {project.stars}
          </div>
          <div className="flex items-center">
            <GitFork className="h-4 w-4 mr-1" />
            {project.forks}
          </div>
          <div className="text-xs">
            Updated {formatRelativeTime(project.updatedAt)}
          </div>
        </div>

        {/* Topics */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.topics.slice(0, 4).map((topic, topicIndex) => (
              <span
                key={topicIndex}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 4 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{project.topics.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-auto">
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="h-4 w-4 mr-2" />
              Code
            </a>
          </Button>
          {project.homepage && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
