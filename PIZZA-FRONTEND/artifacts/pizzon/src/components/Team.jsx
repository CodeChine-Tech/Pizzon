const team = [
  { name: 'Marco Rossi', role: 'Head Pizzaiolo', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80', bio: 'Trained in Naples for 10 years, Marco brings authentic Italian pizza-making to every pie.' },
  { name: 'Sofia Bianchi', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1583394293214-0b4ebc6f4c0e?w=400&q=80', bio: 'Sofia oversees our full menu, combining traditional recipes with creative modern twists.' },
  { name: 'Luca Ferrari', role: 'Pastry Chef', img: 'https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?w=400&q=80', bio: 'Luca crafts our legendary desserts, from classic tiramisu to innovative seasonal treats.' },
  { name: 'Anna Conti', role: 'Sommelier', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', bio: 'Anna curates our wine and cocktail selection, pairing the perfect drink with every dish.' },
];

export default function Team() {
  return (
    <section id="team" className="py-14 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-subtitle">Our Team</span>
          <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
            Meet The Talented Chefs
          </h2>
          <div className="divider-red mx-auto" />
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-2">The passionate culinary artists behind every delicious dish at Pizzon.</p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {team.map((member, i) => (
            <div key={i} className="team-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="team-img-wrap relative">
                <img src={member.img} alt={member.name} style={{ height: 'clamp(200px, 30vw, 280px)' }} />
                <div className="team-social">
                  {['f', 'in', 'tw', 'ig'].map(s => (
                    <a key={s} href="#" onClick={e => e.preventDefault()}
                      className="text-white hover:text-red-200 text-xs font-bold w-7 h-7 rounded-full border border-white/30 flex items-center justify-center transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{member.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: '#e8342e' }}>{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
