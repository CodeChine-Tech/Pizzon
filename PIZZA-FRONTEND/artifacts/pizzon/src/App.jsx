import { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Menu from './components/Menu';
import Specials from './components/Specials';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Reservation from './components/Reservation';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';

function AdminRedirect() {
  useEffect(() => {
    const { hostname, port } = window.location;
    const adminUrl = import.meta.env.VITE_ADMIN_URL;
    if (adminUrl) {
      window.location.replace(adminUrl);
      return;
    }
    if (hostname === 'localhost' && port === '5173') {
      window.location.replace(`${window.location.protocol}//${hostname}:5174`);
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-white">
      <p>Redirecting to admin…</p>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Menu />
      <Specials />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <Team />
      <Reservation />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Navbar />
        <CartDrawer />
        <Switch>
          <Route path="/admin" component={AdminRedirect} />
          <Route path="/" component={HomePage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            </div>
          </Route>
        </Switch>
        <BackToTop />
      </WouterRouter>
    </CartProvider>
  );
}

export default App;
