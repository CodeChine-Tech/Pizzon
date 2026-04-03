
import React from 'react';
import { useLocation } from 'wouter';

const specials = [
  { img: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=80', tag: 'Special Offer', title: 'Weekend Family Bundle', desc: '2 Large Pizzas + 4 Sides + 4 Drinks for just $49.99. Available every weekend.', price: '$49.99', oldPrice: '$72.00' },
  { img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80', tag: 'Limited Time', title: 'Lunch Express Deal', desc: 'Any personal pizza + side salad + soft drink for just $14.99. Mon–Fri 11am–3pm.', price: '$14.99', oldPrice: '$22.00' },
  { img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', tag: 'Happy Hour', title: 'Date Night Special', desc: '2 Medium Pizzas + Bottle of Wine + Tiramisu for 2. Reserve your table today.', price: '$38.99', oldPrice: '$55.00' },
];

export default function Specials() {

  const [, navigate] = useLocation();

  return (
    <section>
       <section className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-subtitle">Today's Specials</span>
          <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
            Hot Deals You Can't Miss
          </h2>
          <div className="divider-red mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {specials.map((s, i) => (
            <div key={i} className="pizza-card rounded-xl overflow-hidden shadow-lg border border-gray-100">

              <div className="relative overflow-hidden" style={{ height: 'clamp(180px,25vw,224px)' }}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded" style={{ background: '#e8342e' }}>
                  {s.tag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-xl font-bold" style={{ color: '#e8342e' }}>{s.price}</span>
                    <span className="text-gray-400 line-through ml-2 text-sm">{s.oldPrice}</span>
                  </div>

                  <button
                    onClick={() => navigate("/order")}
                    className="btn-red text-xs py-2 px-5"
                  >
                    Order Now
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
      {/* baaki code same */}
    </section>
  );
}



