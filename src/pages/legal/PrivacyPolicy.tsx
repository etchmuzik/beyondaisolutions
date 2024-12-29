import { Container } from '../../components/ui/Container';
import { LegalLayout } from '../../components/legal/LegalLayout';

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <section className="prose prose-invert max-w-none">
        <h2>Data Collection and Usage</h2>
        <p>We collect and process your data in accordance with GDPR and local regulations...</p>

        <h2>Information We Collect</h2>
        <ul>
          <li>Contact information (name, email, phone number)</li>
          <li>Usage data and analytics</li>
          <li>Communication preferences</li>
        </ul>

        <h2>How We Use Your Data</h2>
        <p>Your data is used to provide and improve our services...</p>

        <h2>Data Protection</h2>
        <p>We implement industry-standard security measures...</p>
      </section>
    </LegalLayout>
  );
}