import { useCart } from '../context/CartContext';
import { useLocation } from 'wouter';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, clearCart } = useCart();
  const [, navigate] = useLocation();

  if (!isOpen) return null;

  const handleCheckout = () => { setIsOpen(false); navigate('/checkout'); };

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }} onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full z-50 flex flex-col shadow-2xl" style={{ background: '#fff', width: 'min(420px, 100vw)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b flex-shrink-0" style={{ background: '#1a1a1a' }}>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">🛒</span>
            <h2 className="text-white font-bold text-lg sm:text-xl">Your Order</h2>
            {items.length > 0 && (
              <span className="text-white text-xs font-bold rounded-full flex items-center justify-center" style={{ background: '#e8342e', width: '22px', height: '22px' }}>
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-xl leading-none transition-colors w-8 h-8 flex items-center justify-center">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="text-5xl sm:text-6xl mb-4">🍕</div>
              <p className="text-gray-500 font-medium mb-1">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
              <button onClick={() => { setIsOpen(false); navigate('/order'); }} className="btn-red mt-6 text-sm">Browse Menu</button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <img src={item.img} alt={item.name} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-red-50 hover:border-red-400 transition-colors">−</button>
                        <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-red-50 hover:border-red-400 transition-colors">+</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm" style={{ color: '#e8342e' }}>
                          ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                        </span>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors text-base" title="Remove">🗑</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer totals */}
        {items.length > 0 && (
          <div className="border-t px-4 sm:px-6 py-4 sm:py-5 bg-white flex-shrink-0">
            <div className="space-y-1.5 mb-4 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery</span><span style={{ color: '#22c55e' }}>Free</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${(total * 0.08).toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2 mt-1">
                <span>Total</span>
                <span style={{ color: '#e8342e' }}>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <button onClick={handleCheckout} className="btn-red w-full text-center mb-2 py-3">Proceed to Checkout →</button>
            <button onClick={clearCart} className="w-full text-center text-sm text-gray-400 hover:text-red-500 transition-colors py-1">Clear cart</button>
          </div>
        )}
      </div>
    </>
  );
}
