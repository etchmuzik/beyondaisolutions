import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '../ui/Button';

interface CheckoutFormProps {
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

export function CheckoutForm({ isProcessing, setIsProcessing }: CheckoutFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate('/checkout/thank-you');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Payment Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Card Number
            </label>
            <input
              type="text"
              required
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                CVV
              </label>
              <input
                type="text"
                required
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Billing Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Company Name
            </label>
            <input
              type="text"
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isProcessing}
      >
        <Lock className="h-4 w-4 mr-2" />
        {isProcessing ? 'Processing...' : 'Complete Purchase'}
      </Button>

      <p className="text-sm text-gray-400 text-center">
        Your payment is secured with industry-standard encryption
      </p>
    </form>
  );
}