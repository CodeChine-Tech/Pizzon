import { useLocation } from 'wouter';

const NAV = [
  { path: '/', label: 'Dashboard', icon: '▣' },
  { path: '/orders', label: 'Orders', icon: '📋' },
  { path: '/track', label: 'Track', icon: '📍' },
  { path: '/riders', label: 'Riders', icon: '🚴' },
  { path: '/menu', label: 'Menu & Products', icon: '🍕' },
  { path: '/content', label: 'Content', icon: '📄', children: [
    { path: '/content/about', label: 'About' },
    { path: '/content/blog', label: 'Blog' },
    { path: '/content/team', label: 'Team' },
    { path: '/content/specials', label: 'Specials' },
    { path: '/content/gallery', label: 'Gallery' },
    { path: '/content/testimonials', label: 'Testimonials' },
    { path: '/content/contact', label: 'Contact' },
    { path: '/content/reservation', label: 'Reservation' },
  ]},
  { path: '/coupons', label: 'Coupons', icon: '🎫' },
  { path: '/settings', label: 'Settings', icon: '⚙' },
  { path: '/users', label: 'Users', icon: '👥' },
];

export default function AdminSidebar({ onNavigate }) {
  const [location, navigate] = useLocation();
  const contentOpen = location.startsWith('/content');

  const go = (path) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#111] border-r border-gray-800 flex flex-col min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <button onClick={() => go('/')} className="flex items-center gap-2 w-full text-left">
          <span className="font-bold" style={{ fontFamily: 'Pacifico, cursive', color: '#e8342e', fontSize: '1.25rem' }}>
            Pizzon Admin
          </span>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV.map((item) => {
          if (item.children) {
            const isActive = item.children.some((c) => location === c.path || location.startsWith(c.path + '/'));
            return (
              <div key={item.path} className="mb-1">
                <button
                  onClick={() => go(contentOpen ? '/' : '/content/about')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium ${
                    isActive ? 'text-red-400 bg-white/5' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg w-6 text-center">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <span className="text-xs">{contentOpen ? '▼' : '▶'}</span>
                </button>
                {contentOpen && (
                  <div className="pl-4 pr-2 pb-1">
                    {item.children.map((c) => (
                      <button
                        key={c.path}
                        onClick={() => go(c.path)}
                        className={`w-full block py-2 px-3 text-left text-sm rounded ${
                          location === c.path ? 'bg-white/10 text-red-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium ${
                isActive ? 'text-red-400 bg-white/5 border-l-2 border-red-500' : 'text-gray-300 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
              }`}
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
