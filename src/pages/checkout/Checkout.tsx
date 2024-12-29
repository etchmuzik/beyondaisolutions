import { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { CheckoutForm } from '../../components/checkout/CheckoutForm';
import { OrderSummary } from '../../components/checkout/OrderSummary';

export function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className="bg-black min-h-screen pt-24">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CheckoutForm isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
            <OrderSummary />
          </div>
        </div>
      </Container>
    </main>
  );
}