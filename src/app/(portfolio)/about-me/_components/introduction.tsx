'use client';
import { ImageCarousel } from '~/components/image-carousel';
import { profiles } from '#site/content';
import { FadeUpStagger } from '~/components/typography/animated/fade-up';
import { ProfileLink } from '~/components/profile-link';
import { LocationAndTime } from './location-and-time';
import { WorkExperience } from './work-experience';

export function Introduction() {
  const profile = profiles[0];
  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center md:mt-0">
        <div>
          <div className="flex flex-col items-stretch justify-between md:flex-row md:items-start md:gap-4">
            <div className="ml-12 w-fit md:ml-0">
              <ImageCarousel
                items={[
                  {
                    id: 1,
                    title: profile.username,
                    image: profile.profileImage,
                  },
                  {
                    id: 2,
                    title: profile.fullName,
                    image: profile.formalImage,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col pt-6 font-semibold text-secondary-foreground md:pl-10 md:pt-0">
              <div>
                <FadeUpStagger
                  text={profile.fullName}
                  className="text-2xl font-semibold leading-8 md:text-4xl text-white"
                />
                <FadeUpStagger
                  text={profile.username}
                  className="text-2xl font-thin leading-8 md:text-4xl text-white"
                />
              </div>

              <div className="flex flex-col gap-4 pt-8 text-sm font-normal italic text-muted-foreground md:text-lg">
                {profile.links?.map((link: any, index: number) => (
                  <ProfileLink key={link.url} link={link} index={index} />
                ))}
              </div>
              <LocationAndTime />
            </div>
          </div>
        </div>
      </div>
      <WorkExperience company={profile.company} role={profile.role} />
    </>
  );
}
