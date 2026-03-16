const posts = [
  { img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', category: 'Pizza Tips', date: 'March 10, 2026', title: 'The Secret to a Perfect Neapolitan Pizza Dough', desc: 'Learn the ancient techniques and key ingredients that make Neapolitan pizza dough light, airy, and irresistibly delicious.', author: 'Marco Rossi' },
  { img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', category: 'Behind the Scenes', date: 'February 28, 2026', title: 'A Day in the Life of Our Head Pizzaiolo', desc: 'Follow Marco through a typical day at Pizzon — from early morning dough prep to the last pizza of the night.', author: 'Sofia Bianchi' },
  { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', category: 'Restaurant News', date: 'February 15, 2026', title: 'Pizzon Wins Best Italian Restaurant Award 2026', desc: "We're thrilled to announce that Pizzon has been named Best Italian Restaurant of the Year at the City Food Awards.", author: 'Anna Conti' },
];

export default function Blog() {
  return (
    <section id="blog" className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-subtitle">Our Blog</span>
          <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
            Latest News &amp; Stories
          </h2>
          <div className="divider-red mx-auto" />
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            Stay up to date with the latest from Pizzon — tips, stories, awards, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {posts.map((post, i) => (
            <article key={i} className="pizza-card bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 cursor-pointer flex flex-col">
              <div className="relative overflow-hidden" style={{ height: 'clamp(160px,22vw,210px)' }}>
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded" style={{ background: '#e8342e' }}>
                  {post.category}
                </span>
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-3">
                  <span>📅 {post.date}</span>
                  <span className="hidden sm:inline">·</span>
                  <span>✍️ {post.author}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 leading-snug hover:text-red-500 transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{post.desc}</p>
                <a href="#" className="text-sm font-semibold" style={{ color: '#e8342e' }} onClick={e => e.preventDefault()}>
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
