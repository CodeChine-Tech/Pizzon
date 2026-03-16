const testimonials = [
  { name: 'Sarah Johnson', role: 'Food Blogger', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', stars: 5, text: "Absolutely the best pizza I've ever had! The crust is perfectly charred, the sauce is rich and tangy, and the toppings are incredibly fresh. Pizzon has ruined all other pizza for me — in the best possible way!" },
  { name: 'Michael Chen', role: 'Regular Customer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', stars: 5, text: "I've been coming to Pizzon for 5 years. The quality never wavers — every single time. The staff remembers your name, the atmosphere is warm, and the pizza is unbeatable." },
  { name: 'Emily Rodriguez', role: 'Local Food Critic', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', stars: 5, text: "In my years of reviewing restaurants, Pizzon stands out for its commitment to authenticity. The wood-fired oven creates magic. The Margherita alone is worth a trip across town." },
  { name: 'David Kim', role: 'Business Owner', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', stars: 5, text: "We use Pizzon for all our corporate events and team lunches. They always deliver on time, the food is consistently excellent, and the team is an absolute pleasure to work with." },
  { name: 'Lisa Thompson', role: 'Mother of Three', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80', stars: 5, text: "The kids absolutely love Pizzon! The portions are generous, the prices are fair, and there's something for even the pickiest eaters. The desserts are divine too." },
];

function Card({ t }) {
  return (
    <div className="testimonial-card flex flex-col h-full">
      <div className="stars text-lg mb-3">{'★'.repeat(t.stars)}</div>
      <p className="text-gray-600 text-sm leading-relaxed mb-5 italic flex-1">"{t.text}"</p>
      <div className="flex items-center justify-center gap-3">
        <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-red-200 flex-shrink-0" />
        <div className="text-left">
          <p className="font-bold text-gray-900 text-sm">{t.name}</p>
          <p className="text-gray-500 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
            What Our Customers Say
          </h2>
          <div className="divider-red mx-auto" />
        </div>

        {/* Top row: 1 on xs, 2 on sm, 3 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {testimonials.slice(0, 3).map((t, i) => <Card key={i} t={t} />)}
        </div>
        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.slice(3).map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
