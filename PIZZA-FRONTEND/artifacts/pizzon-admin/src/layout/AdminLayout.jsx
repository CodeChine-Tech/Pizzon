import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex">
      <aside className="w-64 flex-shrink-0 hidden md:block bg-[#111] border-r border-gray-800">
        <AdminSidebar />
      </aside>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
      )}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full md:hidden bg-[#111] border-r border-gray-800 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ transition: 'transform 0.2s' }}
      >
        <AdminSidebar onNavigate={() => setMobileMenuOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuClick={() => setMobileMenuOpen((o) => !o)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
