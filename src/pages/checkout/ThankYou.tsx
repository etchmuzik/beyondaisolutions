import { Container } from '../../components/ui/Container';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function ThankYou() {
  return (
    <main className="bg-black min-h-screen pt-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Thank You for Your Purchase!</h1>
          <p className="text-gray-400 mb-8">
            Your order has been confirmed and you'll receive an email with details shortly.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Number:</span>
                <span className="text-white">#ORD-12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="text-white">Professional Plan (Annual)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white">AED 12,999</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Next Steps</h3>
            <ol className="text-left space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">1</span>
                <span className="text-gray-300">Check your email for login credentials</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">2</span>
                <span className="text-gray-300">Complete your account setup</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">3</span>
                <span className="text-gray-300">Schedule an onboarding call with our team</span>
              </li>
            </ol>
          </div>

          <div className="mt-12 space-x-4">
            <Button to="/dashboard" variant="primary">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}