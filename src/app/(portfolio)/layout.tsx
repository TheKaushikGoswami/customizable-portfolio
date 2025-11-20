// import { ResumeDownloadButton } from '~/components/download-resume-button';
import type { Metadata } from 'next';
import { Navbar } from '~/components/navigation';

export const metadata: Metadata = {
  metadataBase: new URL('https://kaushik.softricity.in'),
};
export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      {/* <ResumeDownloadButton /> */}
    </>
  );
}
