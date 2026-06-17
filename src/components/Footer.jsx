import { Link } from 'react-router-dom';
import { openWhatsApp, INSTAGRAM, EMAIL } from '../utils/whatsapp';
import { FaWhatsapp, FaInstagram, FaGoogle } from 'react-icons/fa';

export default function Footer () {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#170014', color: 'rgba(255,255,255,0.75)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

        {/* Brand */}
        <div>
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{
              color: '#c98aa8',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.45rem',
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}>
              My Dazzling Craft
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'rgba(255,255,255,0.5)' }}>
            Handcrafted jewelry that celebrates your unique beauty. Every piece lovingly made with premium materials.
          </p>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            {[
              { icon: <FaWhatsapp size={18} />, action: () => openWhatsApp('Hello! I visited your website.') },
              { icon: <FaInstagram size={18} />, action: () => window.open('https://instagram.com/MyDazzlingCrafts', '_blank') },
              { icon: <FaGoogle size={18} />, action: () => window.open('https://google.com', '_blank') }
            ].map((social, i) => (
              <button
                key={i}
                onClick={social.action}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.75)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#b04a9f'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>
            Quick Links
          </div>
          {[['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
            <Link key={to} to={to} style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f5c7df'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Collections */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>
            Collections
          </div>
          {['Earrings', 'Necklaces', 'Bracelets', 'Rings', 'Bridal Collections', 'Bangles'].map(cat => (
            <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`}
              style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f5c7df'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>
            Contact
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.5rem' }}>📧 {EMAIL}</p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1rem' }}>📸 {INSTAGRAM}</p>
          <button
            onClick={() => openWhatsApp('Hello! I have a question.')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#25D366', color: '#fff', border: 'none',
              padding: '0.5rem 1rem', borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem',
              fontWeight: 500, cursor: 'pointer',
            }}
          >
            <FaWhatsapp size={16} /> WhatsApp Us
          </button>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '0.5rem',
        fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
      }}>
        <span>© {year} My Dazzling Crafts. All rights reserved.</span>
        <span>Handcrafted with 💜 in India</span>
      </div>
    </footer>
  );
}
