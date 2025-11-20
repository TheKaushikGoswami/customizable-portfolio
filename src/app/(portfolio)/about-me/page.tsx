import { Metadata } from 'next';
import { Introduction } from './_components/introduction';
import { Projects } from './_components/projects';
import { Footer } from '~/components/navigation/footer';

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

export default function AboutMe() {
  return (
    <main className="flex justify-center px-4 md:container">
      <section className="flex h-[calc(100vh-48px)] w-full max-w-3xl flex-col">
        <Introduction />
        <Projects />
        <Footer />
      </section>
    </main>
  );
}
