import { useState } from 'react';
import { useCart } from '../context/CartContext';

const categories = ['All', 'Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];

const allItems = [
  { id: 'p1', category: 'Pizza', name: 'Margherita Classic', desc: 'San Marzano tomatoes, fresh mozzarella, basil, EVOO', price: '$12.99', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', badge: 'Bestseller' },
  { id: 'p2', category: 'Pizza', name: 'Pepperoni Feast', desc: 'Double pepperoni, mozzarella, tomato sauce, chili flakes', price: '$15.99', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', badge: 'Popular' },
  { id: 'p3', category: 'Pizza', name: 'BBQ Chicken', desc: 'Grilled chicken, BBQ sauce, red onion, bell peppers, mozzarella', price: '$16.99', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', badge: null },
  { id: 'p4', category: 'Pizza', name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, sun-dried tomatoes, feta', price: '$14.99', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', badge: 'Vegan' },
  { id: 'p5', category: 'Pizza', name: 'Four Cheese', desc: 'Mozzarella, gorgonzola, parmesan, ricotta, truffle oil', price: '$17.99', img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80', badge: "Chef's Pick" },
  { id: 'p6', category: 'Pizza', name: 'Spicy Diavola', desc: 'Spicy salami, jalapeños, chili flakes, tomato, mozzarella', price: '$15.99', img: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=400&q=80', badge: '🔥 Hot' },
  { id: 'pa1', category: 'Pasta', name: 'Spaghetti Carbonara', desc: 'Guanciale, egg yolk, pecorino romano, black pepper', price: '$14.99', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80', badge: 'Classic' },
  { id: 'pa2', category: 'Pasta', name: 'Penne Arrabiata', desc: 'Spicy tomato sauce, garlic, chili, basil, parmesan', price: '$12.99', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80', badge: null },
  { id: 'pa3', category: 'Pasta', name: 'Fettuccine Alfredo', desc: 'Rich cream sauce, parmesan, butter, garlic, parsley', price: '$13.99', img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80', badge: 'Creamy' },
  { id: 'pa4', category: 'Pasta', name: 'Lasagna al Forno', desc: 'Slow-braised bolognese, béchamel, pasta sheets, mozzarella', price: '$16.99', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80', badge: 'Bestseller' },
  { id: 'b1', category: 'Burgers', name: 'Classic Smash', desc: 'Double smashed beef patty, American cheese, pickles, secret sauce', price: '$13.99', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', badge: 'Bestseller' },
  { id: 'b2', category: 'Burgers', name: 'BBQ Bacon', desc: 'Beef patty, crispy bacon, cheddar, BBQ sauce, caramelized onions', price: '$15.99', img: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80', badge: 'Popular' },
  { id: 'b3', category: 'Burgers', name: 'Spicy Chicken', desc: 'Crispy chicken, sriracha mayo, coleslaw, jalapeños, pickles', price: '$14.99', img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80', badge: '🔥 Hot' },
  { id: 'b4', category: 'Burgers', name: 'Veggie Delight', desc: 'Plant-based patty, avocado, tomato, lettuce, vegan mayo', price: '$13.99', img: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&q=80', badge: 'Vegan' },
  { id: 's1', category: 'Salads', name: 'Caesar Salad', desc: 'Romaine, parmesan, house croutons, caesar dressing', price: '$9.99', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80', badge: 'Classic' },
  { id: 's2', category: 'Salads', name: 'Greek Salad', desc: 'Cucumber, tomato, olives, feta, red onion, oregano vinaigrette', price: '$10.99', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=80', badge: 'Vegan' },
  { id: 's3', category: 'Salads', name: 'Caprese Salad', desc: 'Buffalo mozzarella, heirloom tomatoes, basil, balsamic glaze', price: '$11.99', img: 'https://images.unsplash.com/photo-1467453678174-768ec283a940?w=400&q=80', badge: null },
  { id: 'd1', category: 'Desserts', name: 'Tiramisu', desc: 'Mascarpone, espresso-soaked ladyfingers, cocoa dusting', price: '$7.99', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', badge: 'Classic' },
  { id: 'd2', category: 'Desserts', name: 'Chocolate Lava', desc: 'Warm chocolate fondant, vanilla ice cream, caramel sauce', price: '$8.99', img: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&q=80', badge: 'Bestseller' },
  { id: 'd3', category: 'Desserts', name: 'Gelato Trio', desc: 'Three scoops: pistachio, stracciatella, lemon', price: '$6.99', img: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80', badge: 'Popular' },
  { id: 'dr1', category: 'Drinks', name: 'Fresh Lemonade', desc: 'Freshly squeezed lemons, mint, sparkling water', price: '$4.99', img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', badge: null },
  { id: 'dr2', category: 'Drinks', name: 'Espresso', desc: 'Single origin espresso, rich crema', price: '$3.49', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80', badge: 'Popular' },
  { id: 'dr3', category: 'Drinks', name: 'Craft Beer', desc: 'Rotating selection of local craft beers on tap', price: '$6.99', img: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&q=80', badge: null },
];

function ItemCard({ item }) {
  const { addItem, items } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="pizza-card bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
      <div className="relative overflow-hidden" style={{ height: 'clamp(150px,22vw,192px)' }}>
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
        {item.badge && (
          <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#e8342e' }}>{item.badge}</span>
        )}
        {cartItem && (
          <span className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full" style={{ background: '#1a1a1a' }}>×{cartItem.qty}</span>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight flex-1">{item.name}</h3>
          <span className="font-bold text-base sm:text-lg ml-2 flex-shrink-0" style={{ color: '#e8342e' }}>{item.price}</span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{item.desc}</p>
        <button
          onClick={handleAdd}
          className="w-full py-2 sm:py-2.5 text-sm font-bold rounded-lg transition-all duration-200 text-white"
          style={{ background: added ? '#22c55e' : '#e8342e' }}
        >
          {added ? '✓ Added!' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { setIsOpen, count } = useCart();

  const filtered = allItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ background: '#f9f9f9' }}>
      {/* Hero header */}
      <div
        className="text-center relative flex flex-col items-center justify-center"
        style={{
          minHeight: 'clamp(220px, 35vw, 320px)',
          background: 'linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)), url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80) center/cover',
          paddingTop: '80px',
          paddingBottom: '40px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <span className="section-subtitle">Order Online</span>
        <h1 className="font-bold text-white" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,5vw,3.5rem)' }}>
          Our Full Menu
        </h1>
        <p className="text-gray-300 mt-2 max-w-lg mx-auto text-sm sm:text-base">
          Browse all items, add to your cart, and checkout with cash or card. Hot and fresh every time.
        </p>
        {count > 0 && (
          <button onClick={() => setIsOpen(true)}
            className="mt-5 inline-flex items-center gap-2 text-white font-bold rounded-full px-5 py-2.5 text-sm transition-opacity hover:opacity-90"
            style={{ background: '#e8342e' }}>
            🛒 View Cart ({count} {count === 1 ? 'item' : 'items'})
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search + filter */}
        <div className="flex flex-col gap-4 mb-8 sm:mb-10">
          <input
            type="text"
            placeholder="🔍  Search menu items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input-light rounded-lg w-full sm:max-w-sm text-sm"
          />
          {/* Horizontally scrollable on mobile */}
          <div className="scroll-x-snap -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="menu-tab-btn"
                style={activeCategory === cat ? { background: '#e8342e', color: '#fff', borderColor: '#e8342e' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-5 sm:mb-7">
          Showing <strong>{filtered.length}</strong> items
          {activeCategory !== 'All' && <> in <strong>{activeCategory}</strong></>}
          {search && <> matching "<strong>{search}</strong>"</>}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-24 text-gray-400">
            <div className="text-5xl mb-4">🍕</div>
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filtered.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
