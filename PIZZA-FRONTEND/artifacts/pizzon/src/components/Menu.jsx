import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { useCart } from '../context/CartContext';

const categories = ['Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];

const menuItems = {
  Pizza: [
    { name: 'Margherita Classic', desc: 'San Marzano tomatoes, fresh mozzarella, basil, EVOO', price: '$12.99', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', badge: 'Bestseller' },
    { name: 'Pepperoni Feast', desc: 'Double pepperoni, mozzarella, tomato sauce, chili flakes', price: '$15.99', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', badge: 'Popular' },
    { name: 'BBQ Chicken', desc: 'Grilled chicken, BBQ sauce, red onion, bell peppers, mozzarella', price: '$16.99', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', badge: null },
    { name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, sun-dried tomatoes, feta', price: '$14.99', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', badge: 'Vegan' },
    { name: 'Four Cheese', desc: 'Mozzarella, gorgonzola, parmesan, ricotta, truffle oil', price: '$17.99', img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80', badge: "Chef's Pick" },
    { name: 'Spicy Diavola', desc: 'Spicy salami, jalapeños, chili flakes, tomato, mozzarella', price: '$15.99', img: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=400&q=80', badge: '🔥 Hot' },
  ],
  Pasta: [
    { name: 'Spaghetti Carbonara', desc: 'Guanciale, egg yolk, pecorino romano, black pepper', price: '$14.99', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80', badge: 'Classic' },
    { name: 'Penne Arrabiata', desc: 'Spicy tomato sauce, garlic, chili, basil, parmesan', price: '$12.99', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80', badge: null },
    { name: 'Fettuccine Alfredo', desc: 'Rich cream sauce, parmesan, butter, garlic, parsley', price: '$13.99', img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80', badge: 'Creamy' },
    { name: 'Lasagna al Forno', desc: 'Slow-braised bolognese, béchamel, pasta sheets, mozzarella', price: '$16.99', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80', badge: 'Bestseller' },
    { name: 'Pesto Rigatoni', desc: 'Basil pesto, cherry tomatoes, pine nuts, parmesan', price: '$13.99', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', badge: 'Vegan' },
    { name: 'Seafood Linguine', desc: 'Shrimp, mussels, clams, white wine, garlic, parsley', price: '$19.99', img: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=400&q=80', badge: 'Seasonal' },
  ],
  Burgers: [
    { name: 'Classic Smash', desc: 'Double smashed beef patty, American cheese, pickles, secret sauce', price: '$13.99', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', badge: 'Bestseller' },
    { name: 'BBQ Bacon', desc: 'Beef patty, crispy bacon, cheddar, BBQ sauce, caramelized onions', price: '$15.99', img: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80', badge: 'Popular' },
    { name: 'Mushroom Swiss', desc: 'Beef patty, sautéed mushrooms, Swiss cheese, garlic aioli', price: '$14.99', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80', badge: null },
    { name: 'Veggie Delight', desc: 'Plant-based patty, avocado, tomato, lettuce, vegan mayo', price: '$13.99', img: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&q=80', badge: 'Vegan' },
    { name: 'Spicy Chicken', desc: 'Crispy chicken, sriracha mayo, coleslaw, jalapeños, pickles', price: '$14.99', img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80', badge: '🔥 Hot' },
    { name: 'Truffle Wagyu', desc: 'Premium wagyu, truffle mayo, arugula, parmesan, caramelized onion', price: '$22.99', img: 'https://images.unsplash.com/photo-1531156514539-ba7c50b4adf6?w=400&q=80', badge: 'Premium' },
  ],
  Salads: [
    { name: 'Caesar Salad', desc: 'Romaine, parmesan, house croutons, caesar dressing', price: '$9.99', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80', badge: 'Classic' },
    { name: 'Greek Salad', desc: 'Cucumber, tomato, olives, feta, red onion, oregano vinaigrette', price: '$10.99', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=80', badge: 'Vegan' },
    { name: 'Caprese Salad', desc: 'Buffalo mozzarella, heirloom tomatoes, basil, balsamic glaze', price: '$11.99', img: 'https://images.unsplash.com/photo-1467453678174-768ec283a940?w=400&q=80', badge: null },
    { name: 'Quinoa Bowl', desc: 'Quinoa, roasted vegetables, avocado, tahini dressing, seeds', price: '$12.99', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', badge: 'Healthy' },
  ],
  Desserts: [
    { name: 'Tiramisu', desc: 'Mascarpone, espresso-soaked ladyfingers, cocoa dusting', price: '$7.99', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', badge: 'Classic' },
    { name: 'Panna Cotta', desc: 'Vanilla panna cotta with mixed berry coulis and fresh mint', price: '$6.99', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', badge: null },
    { name: 'Chocolate Lava', desc: 'Warm chocolate fondant, vanilla ice cream, caramel sauce', price: '$8.99', img: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&q=80', badge: 'Bestseller' },
    { name: 'Gelato Trio', desc: 'Three scoops: pistachio, stracciatella, lemon', price: '$6.99', img: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80', badge: 'Popular' },
  ],
  Drinks: [
    { name: 'Fresh Lemonade', desc: 'Freshly squeezed lemons, mint, sparkling water', price: '$4.99', img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', badge: null },
    { name: 'Espresso', desc: 'Single origin espresso, rich crema', price: '$3.49', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80', badge: 'Popular' },
    { name: 'Craft Beer', desc: 'Rotating selection of local craft beers on tap', price: '$6.99', img: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&q=80', badge: null },
    { name: 'Italian Soda', desc: 'Pellegrino, blood orange, elderflower', price: '$4.49', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80', badge: null },
  ],
};

export default function Menu() {
  const [active, setActive] = useState('Pizza');
  const [pizzas, setPizzas] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await api.get('/products');
        setPizzas(data.products || []);
      } catch (error) {
        console.error('Failed to fetch pizzas:', error);
      }
    };
    fetchPizzas();
  }, []);

  const getMenuItems = (category) => {
    if (category === 'Pizza') {
      return pizzas.map(pizza => ({
        id: pizza._id,
        name: pizza.name,
        desc: pizza.description,
        price: `$${pizza.sizes[0]?.price || 'N/A'}`, // Use smallest size price
        img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', // Placeholder
        badge: pizza.available ? null : 'Out of Stock'
      }));
    }
    return menuItems[category] || [];
  };

  return (
    <section id="menu" className="py-14 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="section-subtitle">Our Menu</span>
          <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}>
            Explore Our Delicious Food Menu
          </h2>
          <div className="divider-red mx-auto" />
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            From classic Neapolitan pizzas to handcrafted pastas and indulgent desserts.
          </p>
        </div>

        {/* Category tabs — horizontally scrollable on mobile */}
        <div className="scroll-x-snap justify-start sm:justify-center mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`menu-tab-btn ${active === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {getMenuItems(active).map((item, i) => (
            <div key={i} className="pizza-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative overflow-hidden" style={{ height: 'clamp(160px,25vw,210px)' }}>
                <img src={item.img} alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                {item.badge && (
                  <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#e8342e' }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-base leading-snug flex-1">{item.name}</h3>
                  <span className="font-bold text-lg ml-3 flex-shrink-0" style={{ color: '#e8342e' }}>{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                <button onClick={() => addItem(item)} className="text-sm font-semibold border-b-2 pb-0.5 transition-colors" style={{ color: '#e8342e', borderColor: '#e8342e' }}>
                  Order Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
