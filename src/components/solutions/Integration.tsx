import { Container } from '../ui/Container';
import { Check } from 'lucide-react';

const integrations = [
  'Salesforce',
  'HubSpot',
  'Pipedrive',
  'Microsoft Dynamics',
  'Zendesk',
  'Custom CRM',
];

export function Integration() {
  return (
    <section className="py-20 border-t border-white/10">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Seamless Integration with Your Tools
          </h2>
          <p className="text-gray-400 mb-12">
            Connect Beyond AI with your existing tech stack in minutes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration}
                className="flex items-center space-x-2 p-4 rounded-lg border border-white/10"
              >
                <Check className="h-5 w-5 text-primary" />
                <span className="text-white">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}