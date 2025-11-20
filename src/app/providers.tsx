'use client';

import { TooltipProvider } from '~/components/ui/tooltip';
import { Toaster } from 'sonner'; // Changed from local component to sonner
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes'; // Optional: if you want dark mode support

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </ThemeProvider>
  );
}