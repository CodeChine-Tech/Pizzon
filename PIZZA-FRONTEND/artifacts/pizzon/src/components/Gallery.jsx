const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', alt: 'Margherita pizza' },
  { src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80', alt: 'Pizza chef' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', alt: 'Pizza slice' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', alt: 'Restaurant interior' },
  { src: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80', alt: 'Pepperoni pizza' },
  { src: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=80', alt: 'Spicy pizza' },
  { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', alt: 'Veggie pizza' },
  { src: 'https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=600&q=80', alt: 'Pizza dough' },
  { src: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80', alt: 'Restaurant food' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-14 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-subtitle">Our Gallery</span>
          <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
            A Feast For The Eyes
          </h2>
          <div className="divider-red mx-auto" />
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            Take a visual tour of our restaurant, our chefs at work, and the beautiful pizzas we craft with love.
          </p>
        </div>

        {/* 3-col grid on sm+, 2-col on xs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item rounded-lg cursor-pointer"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="overlay rounded-lg">
                <div className="text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>🔍</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
