import { cn } from '~/lib/utils';
import { P } from '../typography';

export function Logo({ className, short = false }: { className?: string; short?: boolean }) {
  return (
    <P className={cn('font-bold', className)}>
      k
      {short ? null : (
        <span>
          <span>aushik</span>
        </span>
      )}
      <span className="text-orange-200">.</span>
    </P>
  );
}
