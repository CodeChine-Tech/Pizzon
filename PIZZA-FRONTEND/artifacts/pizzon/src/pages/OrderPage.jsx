import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../lib/api';

const categories = ['All', 'Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get('/products');
        // Transform products to match the expected format
        const transformedProducts = data.products.map(product => ({
          id: product._id,
          category: 'Pizza', // Default category, you can add category field to products later
          name: product.name,
          desc: product.description,
          price: `$${product.sizes[0]?.price || 12.99}`, // Use first size price
          img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', // Default image
          badge: null,
          sizes: product.sizes
        }));
        setProducts(transformedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-red">
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
