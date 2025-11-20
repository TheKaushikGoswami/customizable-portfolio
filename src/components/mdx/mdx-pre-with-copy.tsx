'use client';
// src/components/mdx/mdx-pre-with-copy.tsx

import clsx from 'clsx';
import { CopyIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner'; // ✅ Import directly from sonner

import { copyToClipboard } from '~/lib/copy-to-clipboard';
import { removeDuplicateNewLine } from '~/lib/remove-duplicate-new-line';
// ❌ Remove: import { useToast } from '../ui/use-toast';

type Props = React.ComponentPropsWithoutRef<'pre'>;

export function PreWithCopy({ children, className, ...props }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  // ❌ Remove: const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const onClick = async () => {
    if (preRef.current?.innerText) {
      await copyToClipboard(removeDuplicateNewLine(preRef.current.innerText));
      setCopied(true);
      // ✅ Update usage:
      toast.success('Code Copied!', {
        description: 'The code has been copied to your clipboard.',
      });
    }
  };

  return (
    // ... keep the rest of the return statement exactly as it was ...
    <div className="group relative">
      <pre {...props} ref={preRef} className={clsx(className, 'focus:outline-none')}>
        <div className="absolute right-0 top-0 z-50 m-2 flex items-center rounded-md bg-transparent">
          <span
            className={clsx('hidden px-2 text-xs text-green-400 ease-in', {
              'group-hover:flex': copied,
            })}
          >
            Copied!
          </span>

          <button
            type="button"
            aria-label="Copy to Clipboard"
            onClick={onClick}
            disabled={copied}
            className={clsx(
              'hidden rounded-md border bg-transparent p-2 transition ease-in focus:outline-none group-hover:flex',
              {
                'border-green-400': copied,
                'border-gray-600 hover:border-gray-400 focus:ring-4 focus:ring-gray-200/50 dark:border-gray-700 dark:hover:border-gray-400':
                  !copied,
              },
            )}
          >
            <CopyIcon
              className={clsx('pointer-events-none h-4 w-4', {
                'text-gray-400 dark:text-gray-400': !copied,
                'text-green-400': copied,
              })}
            />
          </button>
        </div>

        {children}
      </pre>
    </div>
  );
}