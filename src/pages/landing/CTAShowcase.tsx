import { Container } from '../../components/ui/Container';
import {
  SubmitButton,
  DownloadButton,
  SignUpButton,
  LearnMoreButton,
  GetStartedButton,
  ContactButton,
  BuyNowButton,
  FreeTrialButton
} from '../../components/ui/cta';

export function CTAShowcase() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 border-b border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Transform Your Business with AI
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Automate your sales process and boost revenue with our AI-powered solution
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <GetStartedButton size="lg" />
              <LearnMoreButton size="lg" variant="outline" />
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-foreground/70">
              Everything you need to succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="p-6 rounded-lg border border-border bg-background">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Smart Automation
              </h3>
              <p className="text-foreground/70 mb-6">
                Automate repetitive tasks and focus on what matters most.
              </p>
              <LearnMoreButton variant="ghost" />
            </div>
            {/* Add more feature cards */}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-24 border-y border-border">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-foreground/70">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pricing Cards */}
            <div className="p-6 rounded-lg border border-border bg-background">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Starter
              </h3>
              <p className="text-3xl font-bold text-foreground mb-6">
                $49<span className="text-lg font-normal text-foreground/70">/mo</span>
              </p>
              <BuyNowButton fullWidth className="mb-4" />
              <FreeTrialButton variant="outline" fullWidth />
            </div>
            {/* Add more pricing cards */}
          </div>
        </Container>
      </section>

      {/* Download Section */}
      <section className="py-24 bg-card">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get Started Today
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Download our comprehensive guide to AI automation
            </p>
            <DownloadButton size="lg" />
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <Container>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-foreground/70">
                Have questions? We're here to help
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg"
                  placeholder="Your message..."
                />
              </div>
              <SubmitButton fullWidth />
            </form>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-card border-t border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <SignUpButton size="lg" />
              <ContactButton size="lg" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}