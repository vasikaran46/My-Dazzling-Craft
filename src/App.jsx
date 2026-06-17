import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './hooks/useStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Toast from './components/Toast';
import BirthdayPopup from './components/BirthdayPopup';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '76px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <Toast />
      <BirthdayPopup />
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '76px' }}>
        {children}
      </main>
      <WhatsAppButton />
      <Toast />
      <BirthdayPopup />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
          <Route path="/categories" element={<Layout><Categories /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/admin/*" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
