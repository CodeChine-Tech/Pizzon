export default function About() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image collage */}
          <div className="relative mb-8 lg:mb-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80" alt="Pizza chef"
                  className="w-full object-cover rounded-lg shadow-lg" style={{ height: 'clamp(120px,20vw,208px)' }} />
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="Restaurant"
                  className="w-full object-cover rounded-lg shadow-lg" style={{ height: 'clamp(90px,14vw,144px)' }} />
              </div>
              <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                <img src="https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=600&q=80" alt="Pizza dough"
                  className="w-full object-cover rounded-lg shadow-lg" style={{ height: 'clamp(90px,14vw,144px)' }} />
                <img src="https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80" alt="Food"
                  className="w-full object-cover rounded-lg shadow-lg" style={{ height: 'clamp(120px,20vw,208px)' }} />
              </div>
            </div>
            {/* Experience badge */}
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full flex flex-col items-center justify-center text-white text-center shadow-xl"
              style={{ background: '#e8342e', width: 'clamp(72px,12vw,96px)', height: 'clamp(72px,12vw,96px)' }}
            >
              <span className="font-bold leading-tight" style={{ fontSize: 'clamp(1.1rem,3vw,1.5rem)' }}>15+</span>
              <span className="font-semibold leading-tight" style={{ fontSize: 'clamp(0.55rem,1.2vw,0.75rem)' }}>Years<br/>Experience</span>
            </div>
          </div>

          {/* Content */}
          <div className="pt-6 lg:pt-0">
            <span className="section-subtitle">About Us</span>
            <h2 className="font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
              We Are More Than Just A Pizza Restaurant
            </h2>
            <div className="divider-red-left" />
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              Founded in 2008 in the heart of the city, Pizzon has been serving authentic Neapolitan pizza crafted
              with passion, tradition, and the finest ingredients. Our story began with a simple dream: to bring
              the true taste of Italy to every table.
            </p>
            <p className="text-gray-600 mb-7 leading-relaxed text-sm sm:text-base">
              From our hand-tossed dough made fresh daily, to our slow-simmered San Marzano tomato sauce and
              premium imported mozzarella — every pizza we make is a labor of love.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-7">
              {[
                { num: '50+', label: 'Menu Items' },
                { num: '15K+', label: 'Happy Customers' },
                { num: '12', label: 'Expert Chefs' },
                { num: '10+', label: 'Awards Won' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-4">
                  <span className="font-bold" style={{ color: '#e8342e', fontSize: 'clamp(1.5rem,4vw,2.25rem)' }}>{s.num}</span>
                  <span className="text-gray-600 font-medium leading-tight text-sm sm:text-base">{s.label}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo('#menu')} className="btn-red">Explore Our Menu</button>
          </div>
        </div>
      </div>
    </section>
  );
}
