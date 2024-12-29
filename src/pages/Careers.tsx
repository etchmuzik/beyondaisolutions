import { PageLayout } from '../components/layout/PageLayout';
import { CareersHero } from '../components/careers/CareersHero';
import { JobOpenings } from '../components/careers/JobOpenings';
import { CompanyCulture } from '../components/careers/CompanyCulture';
import { Benefits } from '../components/careers/Benefits';
import { CareersTestimonials } from '../components/careers/CareersTestimonials';
import { CareersFAQ } from '../components/careers/CareersFAQ';

export function Careers() {
  return (
    <PageLayout>
      <CareersHero />
      <JobOpenings />
      <CompanyCulture />
      <Benefits />
      <CareersTestimonials />
      <CareersFAQ />
    </PageLayout>
  );
}