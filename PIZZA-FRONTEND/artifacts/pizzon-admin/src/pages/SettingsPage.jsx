import { useState } from 'react';
import PageHeading from '../components/PageHeading';
import { useToast } from '../context/ToastContext';

export default function SettingsPage() {
  const showToast = useToast();
  const [storeName, setStoreName] = useState('Pizzon');
  const [address, setAddress] = useState('123 Napoli Street, Pizza District, NY 10001');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('info@pizzon.com');
  const [hours, setHours] = useState('Mon–Sun: 11:00 AM – 11:00 PM');
  const [taxRate, setTaxRate] = useState('8');
  const [deliveryFee, setDeliveryFee] = useState('0');

  const handleSave = () => {
    showToast('Settings saved');
  };

  return (
    <div>
      <PageHeading subtitle="Site control" title="Settings" description="Store details, hours, and business rules." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Store Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Business Rules</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
              <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Fee (£)</label>
              <input type="number" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} className="form-input" />
            </div>
          </div>
          <button type="button" onClick={handleSave} className="btn-primary mt-4">Save Settings</button>
        </div>
      </div>
    </div>
  );
}
