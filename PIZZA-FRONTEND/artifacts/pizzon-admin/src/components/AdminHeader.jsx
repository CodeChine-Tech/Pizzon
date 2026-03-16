import { useAuth } from '../context/AuthContext';
import NotificationsDropdown from './NotificationsDropdown';

export default function AdminHeader({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-[#1a1a1a] text-white border-b border-gray-800 sticky top-0 z-20 flex-shrink-0">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <NotificationsDropdown />
          <span className="text-gray-400 text-sm hidden sm:inline">{user?.name}</span>
          <button onClick={logout} className="text-white hover:text-red-400 font-medium text-sm uppercase tracking-wider px-3 py-1.5">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
