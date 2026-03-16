import { useState } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

export default function AboutPage() {
  const showToast = useToast();
  const [headline, setHeadline] = useState('We Are More Than Just A Pizza Restaurant');
  const [p1, setP1] = useState('Founded in 2008 in the heart of the city, Pizzon has been serving authentic Neapolitan pizza crafted with passion, tradition, and the finest ingredients.');
  const [p2, setP2] = useState('From our hand-tossed dough made fresh daily, to our slow-simmered San Marzano tomato sauce and premium imported mozzarella — every pizza we make is a labor of love.');
  const [stats, setStats] = useState('50+ Menu Items, 15K+ Happy Customers, 12 Expert Chefs, 10+ Awards Won');

  const handleSave = () => {
    showToast('Saved');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="About" description="Edit the About section shown on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 1</label>
          <textarea rows={3} value={p1} onChange={(e) => setP1(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 2</label>
          <textarea rows={3} value={p2} onChange={(e) => setP2(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stats</label>
          <input type="text" value={stats} onChange={(e) => setStats(e.target.value)} className="form-input" />
        </div>
        <button type="button" onClick={handleSave} className="btn-primary">Save About</button>
      </div>
    </div>
  );
}
