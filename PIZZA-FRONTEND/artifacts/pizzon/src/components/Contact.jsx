import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-subtitle">Contact Us</span>
          <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
            Get In Touch With Us
          </h2>
          <div className="divider-red mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Info */}
          <div className="space-y-5 sm:space-y-6">
            {[
              { icon: '📍', title: 'Our Location', lines: ['123 Napoli Street,', 'Pizza District, NY 10001'] },
              { icon: '📞', title: 'Phone Number', lines: ['+1 (555) 123-4567', '+1 (555) 987-6543'] },
              { icon: '📧', title: 'Email Address', lines: ['info@pizzon.com', 'reservations@pizzon.com'] },
              { icon: '⏰', title: 'Opening Hours', lines: ['Mon–Fri: 11:00 AM – 10:00 PM', 'Sat–Sun: 11:00 AM – 11:00 PM'] },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0" style={{ background: '#e8342e' }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h4>
                  {item.lines.map((l, j) => <p key={j} className="text-gray-500 text-sm">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-5 sm:p-7 lg:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">Send Us a Message</h3>
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-5 text-center text-sm">
                ✅ Thank you! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={submit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input name="name" value={form.name} onChange={handle} placeholder="Full Name *" required className="form-input-light rounded" />
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email Address *" required className="form-input-light rounded" />
              </div>
              <input name="subject" value={form.subject} onChange={handle} placeholder="Subject" className="form-input-light rounded" />
              <textarea name="message" value={form.message} onChange={handle} placeholder="Your message..." required rows={5} className="form-input-light rounded resize-none" />
              <button type="submit" className="btn-red">Send Message</button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 sm:mt-12 rounded-xl overflow-hidden shadow-lg" style={{ height: 'clamp(200px, 35vw, 290px)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.0059948!3d40.7127766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a317bbbe73f%3A0x44891608a37b0eb!2sWall%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1702000000000!5m2!1sen!2sus"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title="Pizzon location map"
          />
        </div>
      </div>
    </section>
  );
}
