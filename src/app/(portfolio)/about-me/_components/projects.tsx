import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { projects } from '#site/content';
import { ProjectCard } from '~/components/project-card';
import { Button } from '~/components/ui/button';

export function Projects() {
  return (
    <>
      <div className="pb-20 pt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, idx) =>
            project.featured ? (
              <ProjectCard key={project.slug} project={project} order={idx} />
            ) : null,
          )}
        </div>
        <div className="mb-2 mt-10 flex justify-center">
          <Link href="/projects">
            <Button variant="link" size="sm" className="rounded-full text-xs">
              <ChevronDown size={20} className="mr-2" />
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
