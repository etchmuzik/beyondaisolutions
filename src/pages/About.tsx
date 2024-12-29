import { PageLayout } from '../components/layout/PageLayout';
import { AboutHero } from '../components/about/AboutHero';
import { OurMission } from '../components/about/OurMission';
import { CompanyTimeline } from '../components/about/CompanyTimeline';
import { TeamMembers } from '../components/about/TeamMembers';
import { Achievements } from '../components/about/Achievements';
import { ClientTestimonials } from '../components/about/ClientTestimonials';
import { ContactCTA } from '../components/about/ContactCTA';

export function About() {
  return (
    <PageLayout>
      <AboutHero />
      <OurMission />
      <CompanyTimeline />
      <TeamMembers />
      <Achievements />
      <ClientTestimonials />
      <ContactCTA />
    </PageLayout>
  );
}