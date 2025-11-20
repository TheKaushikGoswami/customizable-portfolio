'use client';
// src/components/typography/copy-to-clipboard.tsx

import { Tooltip, TooltipTrigger, TooltipContent } from '~/components/ui/tooltip';
import { Check, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner'; // ✅ Changed import
// ❌ Remove: import { toast } from '../ui/use-toast';
// ❌ Remove: import { CopySuccessIcon } from '../animated-icon'; (Sonner icons are usually simpler, or pass it as a prop)

export function CopyableText({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLParagraphElement>) {
  const [hasCopied, setHasCopied] = useState(false);

  async function handleCopy() { // Renamed to avoid naming conflict with import
    try {
      await navigator.clipboard.writeText(children as string);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      
      // ✅ Update usage
      toast.success('Copied!', {
        description: children as string,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  
  return (
    <div className="flex items-center">
      <p className={className} {...props}>
        {children}
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={hasCopied ? 'success' : 'ghost'}
            className="ml-1 h-auto w-auto p-1.5"
            onClick={handleCopy}
          >
            {hasCopied ? (
              <Check className="size-4 md:size-5" />
            ) : (
              <Copy className="size-4 md:size-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy!</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}