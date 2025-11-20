import { ExternalLinkIcon, PenLine } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <div className="w-full pb-2 pt-5 text-xs">
      <div className="mt-6 flex flex-col border-t p-6 text-center text-xs text-muted-foreground md:flex-row md:justify-between">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} kaushik.</p>
        <div className="flex items-center justify-center gap-2">
          <Link
            className="flex items-center gap-1 underline-offset-2 hover:underline"
            href="/projects"
          >
            Projects
          </Link>{' '}
          |
          <a
            className="flex items-center gap-1 underline-offset-2 hover:underline"
            href="https://github.com/thekaushikgoswami"
          >
            Github<ExternalLinkIcon size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
