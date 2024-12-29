import { Container } from '../../ui/Container';
import { WorkProcessStep } from './WorkProcessStep';
import { ConnectingLine } from './components/ConnectingLine';
import { SectionHeader } from './components/SectionHeader';
import { WORK_PROCESS_STEPS } from './constants';

export function WorkProcess() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <Container className="relative">
        <SectionHeader 
          title="How our AI and Automation Agency Works"
          description="We work like your Chief AI Officer - we provide you with a hands-free solution to upgrade your business in sync with AI trends."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <ConnectingLine />
          {WORK_PROCESS_STEPS.map((step, index) => (
            <WorkProcessStep 
              key={step.title} 
              {...step} 
              number={index + 1} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
}