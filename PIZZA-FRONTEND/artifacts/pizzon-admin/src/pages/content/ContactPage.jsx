import { useState } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const showToast = useToast();
  const [address, setAddress] = useState('123 Napoli Street, Pizza District, NY 10001');
  const [phones, setPhones] = useState('+1 (555) 123-4567, +1 (555) 987-6543');
  const [emails, setEmails] = useState('info@pizzon.com, reservations@pizzon.com');
  const [hours, setHours] = useState('Mon–Fri: 11:00 AM – 10:00 PM, Sat–Sun: 11:00 AM – 11:00 PM');

  const handleSave = () => {
    showToast('Saved');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="Contact" description="Contact info shown on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone(s)</label>
          <input type="text" value={phones} onChange={(e) => setPhones(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email(s)</label>
          <input type="text" value={emails} onChange={(e) => setEmails(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
          <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} className="form-input" />
        </div>
        <button type="button" onClick={handleSave} className="btn-primary">Save Contact</button>
      </div>
    </div>
  );
}
