'use client';

import { Section, SectionHeader } from '@/components/section';
import { RepoCard } from '@/components/repo-card';
import { getProjectsDataClient } from '@/lib/content-client';
import { useLiveData } from '@/lib/hooks/use-live-data';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const { githubData } = useLiveData();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      if (githubData?.projects) {
        setProjects(githubData.projects);
      } else {
        // Fallback to static data
        const staticProjects = await getProjectsDataClient();
        setProjects(staticProjects);
      }
    };
    
    loadProjects();
  }, [githubData]);

  return (
    <Section>
      <SectionHeader
        title="Projects"
        description="Open source work and technical projects that demonstrate my skills and interests"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <RepoCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
