import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../../constants/contact';

export function ContactInfo() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <Phone className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Phone</h3>
            <p className="text-gray-400">{CONTACT_INFO.phone}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Mail className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Email</h3>
            <p className="text-gray-400">{CONTACT_INFO.email}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Location</h3>
            <p className="text-gray-400">{CONTACT_INFO.address}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-start space-x-4">
            <Clock className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="text-white font-medium mb-2">Business Hours</h3>
              <p className="text-gray-400">Monday - Friday: {CONTACT_INFO.businessHours.weekdays}</p>
              <p className="text-gray-400">Saturday: {CONTACT_INFO.businessHours.saturday}</p>
              <p className="text-gray-400">Sunday: {CONTACT_INFO.businessHours.sunday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}