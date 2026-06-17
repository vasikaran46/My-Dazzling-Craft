import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useStore } from '../hooks/useStore';
import logo from '../../assets/logo/ChatGPT Image Jun 15, 2026, 02_24_08 PM.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlistCount, cartCount } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e7b9d4',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '72px',
        transition: 'all 0.3s',
        boxShadow: scrolled ? '0 2px 20px rgba(176,74,159,0.1)' : 'none',
      }}>
        {/* Logo */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}
        >
          <img
            src={logo}
            alt="My Dazzling Craft"
            style={{ height: '40px', width: '40px', objectFit: 'cover', objectPosition: 'center', flexShrink: 0, borderRadius: '8px' }}
          />
          <span
            className="brand-name"
            style={{
              color: '#c98aa8',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.45rem',
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            My Dazzling Craft
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive(link.to) ? '#b04a9f' : '#333',
                position: 'relative',
                paddingBottom: '2px',
                borderBottom: isActive(link.to) ? '1.5px solid #b04a9f' : '1.5px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/shop')}
            title="Wishlist"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '1.2rem', color: '#333', position: 'relative',
              display: 'flex', alignItems: 'center',
            }}
          >
            <FiHeart size={20} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute', top: '-7px', right: '-7px',
                background: '#b04a9f', color: '#fff', fontSize: '9px',
                width: '16px', height: '16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/cart')}
            title="Cart"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '1.2rem', color: '#333', position: 'relative',
              display: 'flex', alignItems: 'center',
            }}
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-7px', right: '-7px',
                background: '#25D366', color: '#fff', fontSize: '9px',
                minWidth: '16px', height: '16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                padding: '0 4px',
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/admin"
            style={{
              background: '#b04a9f', color: '#fff', border: 'none',
              padding: '0.45rem 1.1rem', borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem',
              fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
              cursor: 'pointer', textDecoration: 'none',
            }}
          >
            Login
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', color: '#333' }}
            className="hamburger-btn"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0,
                background: 'rgba(23, 0, 20, 0.4)', backdropFilter: 'blur(4px)',
                zIndex: 998,
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 999,
                background: 'linear-gradient(180deg, #ffffff 0%, #fff8fb 100%)',
                borderBottom: '2px solid #b04a9f',
                boxShadow: '0 10px 30px rgba(176, 74, 159, 0.15)',
                padding: '1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
                maxHeight: 'calc(100vh - 72px)', overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      textDecoration: 'none', fontSize: '1.05rem',
                      color: isActive(link.to) ? '#b04a9f' : '#333',
                      fontWeight: isActive(link.to) ? 600 : 500,
                      padding: '0.65rem 0.75rem',
                      borderRadius: '4px',
                      background: isActive(link.to) ? 'rgba(245, 199, 223, 0.25)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  style={{
                    textDecoration: 'none', fontSize: '1.05rem',
                    color: '#fff', fontWeight: 500,
                    padding: '0.65rem', borderRadius: '4px',
                    background: '#b04a9f', textAlign: 'center',
                    marginTop: '0.5rem', transition: 'background 0.2s'
                  }}
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }

        @media (max-width: 520px) {
          nav { padding: 0 1rem !important; }
          .brand-name { font-size: 0.95rem !important; }
        }

        @media (max-width: 390px) {
          .brand-name { display: none !important; }
        }
      `}</style>
    </>
  );
}