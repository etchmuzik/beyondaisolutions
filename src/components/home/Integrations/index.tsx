import { Container } from '../../ui/Container';
import { IntegrationGrid } from './IntegrationGrid';
import { IntegrationsHeader } from './IntegrationsHeader';
import { IntegrationsFooter } from './IntegrationsFooter';

export function Integrations() {
  return (
    <section className="py-24 bg-black border-t border-white/10">
      <Container>
        <IntegrationsHeader />
        <IntegrationGrid />
        <IntegrationsFooter />
      </Container>
    </section>
  );
}