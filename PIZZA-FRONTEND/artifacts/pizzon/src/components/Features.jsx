const features = [
  { icon: '🍕', title: 'Fresh Ingredients', desc: 'We source only the finest, freshest ingredients from local farms and trusted suppliers every single day.' },
  { icon: '🔥', title: 'Wood Fire Oven', desc: 'Our authentic wood-fired ovens reach 900°F, giving every pizza a perfectly charred, crispy crust.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Hot pizza delivered to your door in 30 minutes or less. Fresh, fast, and always delicious.' },
  { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Our master pizzaiolos trained in Naples bring decades of authentic Italian pizza-making expertise.' },
];

export default function Features() {
  return (
    <section className="py-10 sm:py-14" style={{ background: '#1a1a1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-red-500 transition-colors group"
            >
              <div
                className="text-3xl flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(232,52,46,0.15)' }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1 group-hover:text-red-400 transition-colors">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
