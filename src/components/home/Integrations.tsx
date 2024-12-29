import { Container } from '../ui/Container';

const integrations = [
  { name: 'Gmail', icon: '/logos/gmail.svg' },
  { name: 'Zoom', icon: '/logos/zoom.svg' },
  { name: 'Google Drive', icon: '/logos/gdrive.svg' },
  { name: 'Microsoft Teams', icon: '/logos/teams.svg' },
  { name: 'Salesforce', icon: '/logos/salesforce.svg' },
  { name: 'Slack', icon: '/logos/slack.svg' },
  { name: 'Jira', icon: '/logos/jira.svg' },
  { name: 'Notion', icon: '/logos/notion.svg' },
  { name: 'Figma', icon: '/logos/figma.svg' }
];

export function Integrations() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            We connect to all your apps
          </h2>
          <p className="text-xl text-foreground/70">
            Plus thousands more through APIs, custom code and web hooks.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto mb-12">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <img
                src={integration.icon}
                alt={integration.name}
                className="w-12 h-12 mb-2 opacity-70"
              />
              <span className="text-sm text-foreground/70">{integration.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-foreground/70">
          Don't see your tool? We can build custom integrations for your specific needs.
        </p>
      </Container>
    </section>
  );
}