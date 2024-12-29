import { Check } from 'lucide-react';

export function OrderSummary() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400">Professional Plan (Annual)</span>
          <span className="text-white">AED 12,999</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Discount (20%)</span>
          <span className="text-green-400">-AED 2,600</span>
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-white">Total</span>
            <span className="text-lg font-medium text-white">AED 10,399</span>
          </div>
        </div>
      </div>

      <div className="bg-black/40 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-white mb-3">Plan Includes:</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-300">
            <Check className="h-4 w-4 text-primary mr-2" />
            Up to 50,000 minutes/month
          </li>
          <li className="flex items-center text-gray-300">
            <Check className="h-4 w-4 text-primary mr-2" />
            Advanced analytics
          </li>
          <li className="flex items-center text-gray-300">
            <Check className="h-4 w-4 text-primary mr-2" />
            Priority support
          </li>
          <li className="flex items-center text-gray-300">
            <Check className="h-4 w-4 text-primary mr-2" />
            Custom workflows
          </li>
        </ul>
      </div>

      <p className="text-sm text-gray-400">
        By completing your purchase, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}