import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
// import './blog.css'; // You removed this earlier
import { cn } from '~/lib/utils';
import { Providers } from './providers';

const mono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'About Me | kaushik (Kaushik Goswami)',
  description: 'Fullstack developer skilled in crafting seamless web experiences.',
  metadataBase: new URL('https://kaushik.softricity.in'),
  openGraph: {
    title: 'About Me | kaushik (Kaushik Goswami)',
    description: 'Fullstack developer skilled in crafting seamless web experiences.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ Add suppressHydrationWarning here
    <html lang="en" suppressHydrationWarning>
      <body className={cn(mono.className, 'mt-12')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}