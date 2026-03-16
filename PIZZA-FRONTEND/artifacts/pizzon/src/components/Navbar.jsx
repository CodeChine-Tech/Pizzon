import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { count, setIsOpen } = useCart();

  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const links = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'About', href: '#about', isRoute: false },
    { label: 'Menu', href: '#menu', isRoute: false },
    { label: 'Gallery', href: '#gallery', isRoute: false },
    { label: 'Team', href: '#team', isRoute: false },
    { label: 'Blog', href: '#blog', isRoute: false },
    { label: 'Contact', href: '#contact', isRoute: false },
  ];

  const handleLink = (e, link) => {
    e.preventDefault();
    setMobileOpen(false);
    if (link.isRoute) {
      navigate(link.href);
    } else {
      const scroll = () => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      if (!isHome) { navigate('/'); setTimeout(scroll, 120); }
      else scroll();
    }
  };

  const bookTable = () => {
    setMobileOpen(false);
    const scroll = () => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' });
    if (!isHome) { navigate('/'); setTimeout(scroll, 120); }
    else scroll();
  };

  const dark = !isHome || scrolled;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: dark ? '#1a1a1a' : 'transparent', boxShadow: dark ? '0 2px 20px rgba(0,0,0,0.3)' : 'none', paddingTop: dark ? '8px' : '14px', paddingBottom: dark ? '8px' : '14px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => { setMobileOpen(false); navigate('/'); }} className="flex items-center gap-2">
          <span className="font-bold" style={{ fontFamily: 'Pacifico, cursive', color: '#e8342e', fontSize: 'clamp(1.3rem,3vw,1.6rem)' }}>
            Pizzon
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={e => handleLink(e, link)}
                className="text-white hover:text-red-400 font-medium text-xs xl:text-sm uppercase tracking-wider transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <button onClick={() => navigate('/order')}
            className="text-white hover:text-red-400 font-medium text-xs xl:text-sm uppercase tracking-wider transition-colors mr-1">
            Order Online
          </button>
          <button onClick={() => setIsOpen(true)} className="relative flex items-center justify-center w-9 h-9 text-white hover:text-red-400 transition-colors" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 xl:w-6 xl:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-white font-bold rounded-full flex items-center justify-center" style={{ background: '#e8342e', width: '18px', height: '18px', fontSize: '10px' }}>
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
          <button onClick={bookTable} className="btn-red" style={{ fontSize: '0.7rem', padding: '9px 18px' }}>Book A Table</button>
        </div>

        {/* Mobile right: cart + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="relative text-white p-1" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 text-white font-bold rounded-full flex items-center justify-center" style={{ background: '#e8342e', width: '16px', height: '16px', fontSize: '9px' }}>
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1 focus:outline-none" aria-label="Toggle menu">
            <div style={{ width: 24 }}>
              <span className="block h-0.5 bg-white transition-all duration-300 mb-1.5" style={{ transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : '' }} />
              <span className="block h-0.5 bg-white transition-all duration-300 mb-1.5" style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span className="block h-0.5 bg-white transition-all duration-300" style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : '' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileOpen ? '500px' : '0', background: '#1a1a1a' }}
      >
        <div className="px-4 sm:px-6 pt-2 pb-4 border-t border-gray-800">
          {links.map(link => (
            <a key={link.href} href={link.href} onClick={e => handleLink(e, link)}
              className="block text-white hover:text-red-400 py-3 font-medium text-sm uppercase tracking-wider border-b border-gray-800 last:border-0 transition-colors">
              {link.label}
            </a>
          ))}
          <a href="/order" onClick={e => { e.preventDefault(); setMobileOpen(false); navigate('/order'); }}
            className="block text-white hover:text-red-400 py-3 font-medium text-sm uppercase tracking-wider border-b border-gray-800 transition-colors">
            Order Online
          </a>
          <button onClick={bookTable} className="btn-red mt-4 w-full text-center text-xs py-3">
            Book A Table
          </button>
        </div>
      </div>
    </nav>
  );
}
