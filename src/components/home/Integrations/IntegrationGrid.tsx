import { IntegrationCard } from './IntegrationCard';
import { INTEGRATIONS } from './constants';

export function IntegrationGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {INTEGRATIONS.map((integration) => (
        <IntegrationCard 
          key={integration.name} 
          {...integration}
        />
      ))}
    </div>
  );
}