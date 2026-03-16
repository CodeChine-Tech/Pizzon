import { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter, useLocation } from 'wouter';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DispatchProvider } from './context/DispatchContext';
import { ToastProvider } from './context/ToastContext';
import AdminLayout from './layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrdersDashboard from './pages/OrdersDashboard';
import OrderDetailsPage from './pages/OrderDetailsPage';
import LiveTrackPage from './pages/LiveTrackPage';
import RidersPage from './pages/RidersPage';
import MenuPage from './pages/MenuPage';
import SettingsPage from './pages/SettingsPage';
import CouponsPage from './pages/CouponsPage';
import UsersPage from './pages/UsersPage';
import AboutPage from './pages/content/AboutPage';
import BlogPage from './pages/content/BlogPage';
import TeamPage from './pages/content/TeamPage';
import SpecialsPage from './pages/content/SpecialsPage';
import GalleryPage from './pages/content/GalleryPage';
import TestimonialsPage from './pages/content/TestimonialsPage';
import ContactPage from './pages/content/ContactPage';
import ReservationPage from './pages/content/ReservationPage';

function RedirectTo({ to }) {
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation(to); }, [to, setLocation]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-white">
      Redirecting…
    </div>
  );
}

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();

  if (location === '/login') {
    return isAuthenticated ? <RedirectTo to="/" /> : <LoginPage />;
  }

  if (!isAuthenticated) {
    return <RedirectTo to="/login" />;
  }

  return (
    <DispatchProvider>
      <ToastProvider>
      <AdminLayout>
        <Switch>
          <Route path="/orders/:id" component={OrderDetailsPage} />
          <Route path="/orders" component={OrdersDashboard} />
          <Route path="/track" component={LiveTrackPage} />
          <Route path="/riders" component={RidersPage} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/content/about" component={AboutPage} />
          <Route path="/content/blog" component={BlogPage} />
          <Route path="/content/team" component={TeamPage} />
          <Route path="/content/specials" component={SpecialsPage} />
          <Route path="/content/gallery" component={GalleryPage} />
          <Route path="/content/testimonials" component={TestimonialsPage} />
          <Route path="/content/contact" component={ContactPage} />
          <Route path="/content/reservation" component={ReservationPage} />
          <Route path="/coupons" component={CouponsPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/" component={DashboardPage} />
          <Route>
            <div className="py-12 text-center text-gray-500">Page not found.</div>
          </Route>
        </Switch>
      </AdminLayout>
      </ToastProvider>
    </DispatchProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
        <ProtectedRoutes />
      </WouterRouter>
    </AuthProvider>
  );
}

export default App;
