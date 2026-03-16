import { useState } from 'react';

export default function Reservation() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' });
  };

  return (
    <section id="reservation" className="py-14 sm:py-20 lg:py-24 reservation-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Info */}
          <div className="text-white">
            <span className="section-subtitle">Reservations</span>
            <h2 className="font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
              Book Your Table Today
            </h2>
            <div className="divider-red-left" />
            <p className="text-gray-300 mb-7 leading-relaxed text-sm sm:text-base">
              Reserve your spot at Pizzon and enjoy an unforgettable dining experience. We accommodate groups of all sizes.
            </p>
            <div className="space-y-4 sm:space-y-5">
              {[
                { icon: '📍', label: 'Address', val: '123 Napoli Street, Pizza District, NY 10001' },
                { icon: '📞', label: 'Phone', val: '+1 (555) 123-4567' },
                { icon: '📧', label: 'Email', val: 'reservations@pizzon.com' },
                { icon: '⏰', label: 'Opening Hours', val: 'Mon–Sun: 11:00 AM – 11:00 PM' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg sm:text-xl"
                    style={{ background: 'rgba(232,52,46,0.3)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-white font-medium text-sm sm:text-base">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl p-5 sm:p-7 border border-white/20" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">Make a Reservation</h3>
            {submitted && (
              <div className="bg-green-500 text-white p-3 rounded-lg mb-5 text-center font-semibold text-sm">
                ✅ Reservation confirmed! We'll contact you shortly.
              </div>
            )}
            <form onSubmit={submit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input name="name" value={form.name} onChange={handle} placeholder="Full Name *" required className="form-input rounded" />
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email Address *" required className="form-input rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input name="phone" value={form.phone} onChange={handle} placeholder="Phone Number *" required className="form-input rounded" />
                <select name="guests" value={form.guests} onChange={handle} className="form-input rounded">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n} style={{ color: '#333' }}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input name="date" type="date" value={form.date} onChange={handle} required className="form-input rounded" />
                <select name="time" value={form.time} onChange={handle} required className="form-input rounded">
                  <option value="" style={{ color: '#333' }}>Select Time</option>
                  {['11:00 AM','12:00 PM','1:00 PM','2:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM'].map(t => (
                    <option key={t} value={t} style={{ color: '#333' }}>{t}</option>
                  ))}
                </select>
              </div>
              <textarea name="message" value={form.message} onChange={handle} placeholder="Special requests or notes..." rows={3} className="form-input rounded resize-none" />
              <button type="submit" className="btn-red w-full text-center">Reserve My Table</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
