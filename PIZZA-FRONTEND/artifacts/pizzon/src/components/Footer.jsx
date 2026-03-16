export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: '#111111' }} className="text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-gray-800">

          {/* Brand */}
          <div>
            <div className="text-3xl font-bold mb-4" style={{ fontFamily: 'Pacifico, cursive', color: '#e8342e' }}>Pizzon</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Authentic Italian pizza crafted with love, tradition, and the finest ingredients since 2008.
            </p>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {[{ icon: 'f', bg: '#3b5998' }, { icon: 'tw', bg: '#1da1f2' }, { icon: 'ig', bg: '#e1306c' }, { icon: 'yt', bg: '#ff0000' }].map(s => (
                <a key={s.icon} href="#" onClick={e => e.preventDefault()}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity"
                  style={{ background: s.bg }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-5">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Our Menu', href: '#menu' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Our Team', href: '#team' },
                { label: 'Contact', href: '#contact' },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-gray-400 hover:text-red-400 text-sm transition-colors flex items-center gap-2">
                    <span style={{ color: '#e8342e' }}>›</span>{link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-5">Opening Hours</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              {[
                { day: 'Mon – Thursday', time: '11 AM – 10 PM' },
                { day: 'Friday', time: '11 AM – 11:30 PM' },
                { day: 'Saturday', time: '10 AM – 11:30 PM' },
                { day: 'Sunday', time: '10 AM – 10 PM' },
              ].map((h, i) => (
                <li key={i} className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400 text-xs sm:text-sm">{h.day}</span>
                  <span style={{ color: '#e8342e' }} className="font-semibold text-xs sm:text-sm">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-5">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe for exclusive deals and new menu announcements.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <input type="email" placeholder="Your email..." className="flex-1 min-w-0 px-3 py-2 bg-gray-800 border border-gray-700 text-white text-sm rounded focus:border-red-500 outline-none placeholder-gray-500" />
              <button type="submit" className="btn-red py-2 px-3 text-sm flex-shrink-0">→</button>
            </form>
            <div className="mt-5 space-y-2">
              {[
                { icon: '📍', text: '123 Napoli St, NY 10001' },
                { icon: '📞', text: '+1 (555) 123-4567' },
                { icon: '📧', text: 'info@pizzon.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className="text-gray-400 text-xs sm:text-sm truncate">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500">
          <p>© 2026 Pizzon. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} className="hover:text-red-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
