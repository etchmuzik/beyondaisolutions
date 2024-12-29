import { PageLayout } from '../components/layout/PageLayout';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { AssistantOptions } from '../components/contact/AssistantOptions';

export function Contact() {
  return (
    <PageLayout>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-400">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <AssistantOptions />
          <ContactForm />
        </div>
        <ContactInfo />
      </div>
    </PageLayout>
  );
}