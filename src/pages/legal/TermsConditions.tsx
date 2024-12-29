import { Container } from '../../components/ui/Container';
import { LegalLayout } from '../../components/legal/LegalLayout';

export function TermsConditions() {
  return (
    <LegalLayout title="Terms & Conditions">
      <section className="prose prose-invert max-w-none">
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using our services, you agree to these terms...</p>

        <h2>User Responsibilities</h2>
        <ul>
          <li>Maintain accurate account information</li>
          <li>Protect account credentials</li>
          <li>Comply with usage guidelines</li>
        </ul>

        <h2>Service Usage</h2>
        <p>Our services are provided "as is" and subject to these terms...</p>

        <h2>Intellectual Property</h2>
        <p>All content and materials are protected by copyright...</p>
      </section>
    </LegalLayout>
  );
}