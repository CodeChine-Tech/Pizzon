import { useState } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

export default function ReservationPage() {
  const showToast = useToast();
  const [headline, setHeadline] = useState('Book Your Table Today');
  const [desc, setDesc] = useState('Reserve your spot at Pizzon and enjoy an unforgettable dining experience.');
  const [address, setAddress] = useState('123 Napoli Street, Pizza District, NY 10001');

  const handleSave = () => {
    showToast('Saved');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="Reservation" description="Reservation section on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
        </div>
        <button type="button" onClick={handleSave} className="btn-primary">Save Reservation</button>
      </div>
    </div>
  );
}
