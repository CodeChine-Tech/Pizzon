import { useState, useEffect } from 'react';

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80',
    subtitle: 'Welcome to Pizzon',
    title: 'Authentic Italian Pizza',
    titleRed: 'Experience',
    desc: 'Savor the taste of Italy with our wood-fired pizzas made from the finest ingredients. Every bite is a journey to Naples.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=80',
    subtitle: 'Delicious & Fresh',
    title: 'Made With Love &',
    titleRed: 'Fresh Ingredients',
    desc: 'We use only the freshest, locally sourced ingredients to craft pizzas that burst with authentic Italian flavor.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1920&q=80',
    subtitle: 'Special Offers',
    title: 'Best Pizza In',
    titleRed: 'The Town',
    desc: "Award-winning recipes passed down through generations. Come taste why we're the city's most-loved pizza restaurant.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.58),rgba(0,0,0,0.58)), url(${s.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 lg:py-0">
        <div className="max-w-xs sm:max-w-xl lg:max-w-2xl">
          <span className="text-red-400 block mb-3 sm:mb-4" style={{ fontFamily: 'Pacifico, cursive', fontSize: 'clamp(1rem,3vw,1.25rem)' }}>
            {slide.subtitle}
          </span>
          <h1
            className="font-bold text-white leading-tight mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            {slide.title}{' '}
            <span style={{ color: '#e8342e' }}>{slide.titleRed}</span>
          </h1>
          <p className="text-gray-300 mb-8 sm:mb-10 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.125rem)' }}>
            {slide.desc}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button onClick={() => scrollTo('#menu')} className="btn-red">Explore Menu</button>
            <button onClick={() => scrollTo('#reservation')} className="btn-outline-white">Book A Table</button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-3 rounded-full transition-all duration-300"
            style={{ width: i === current ? '2rem' : '0.75rem', background: i === current ? '#e8342e' : 'rgba(255,255,255,0.5)' }}
          />
        ))}
      </div>

      {/* Scroll hint — desktop only */}
      <div className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-1">
        <button onClick={() => scrollTo('#about')} className="text-white/60 hover:text-white text-xs uppercase tracking-widest flex flex-col items-center gap-1">
          <span>Scroll</span><span className="text-base">↓</span>
        </button>
      </div>
    </section>
  );
}
