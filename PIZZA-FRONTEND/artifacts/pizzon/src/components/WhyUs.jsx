export default function WhyUs() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 about-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
              The Pizzon Difference
            </h2>
            <div className="divider-red-left" />
            <p className="text-gray-300 mb-7 leading-relaxed text-sm sm:text-base">
              At Pizzon, we believe every meal should be an experience worth remembering.
            </p>
            <div className="space-y-5">
              {[
                { icon: '✅', title: '100% Fresh Ingredients', desc: 'We never use frozen ingredients. Everything is sourced fresh daily from local suppliers.' },
                { icon: '🏆', title: 'Award-Winning Recipes', desc: 'Our recipes have won multiple culinary awards and featured in top food publications.' },
                { icon: '♻️', title: 'Sustainable Practices', desc: 'Committed to eco-friendly packaging and minimizing our carbon footprint.' },
                { icon: '😊', title: 'Exceptional Service', desc: 'Our warm, attentive team ensures every visit is a memorable experience.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg sm:text-xl"
                    style={{ background: 'rgba(232,52,46,0.25)', border: '2px solid #e8342e' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-base sm:text-lg mb-0.5">{item.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-4 lg:mt-0">
            {[
              { number: '15+', label: 'Years of Experience' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '30+', label: 'Pizza Varieties' },
              { number: '12', label: 'Award-Winning Chefs' },
            ].map((stat, i) => (
              <div key={i} className="text-center rounded-xl p-5 sm:p-7"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="font-bold mb-2" style={{ color: '#e8342e', fontSize: 'clamp(2rem,5vw,3rem)' }}>{stat.number}</div>
                <p className="text-gray-300 font-medium text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
