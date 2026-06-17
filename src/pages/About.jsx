import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const values = [
  { icon: '💎', title: 'Our Mission', text: 'To create exquisite handmade jewelry that empowers every woman to express her individuality and celebrate life\'s beautiful moments.' },
  { icon: '🌟', title: 'Our Vision', text: 'To be India\'s most beloved handmade jewelry brand — known for quality, creativity, and the personal touch in every piece.' },
  { icon: '🤲', title: 'Craftsmanship', text: 'Each piece is crafted by hand using premium 925 sterling silver, freshwater pearls, semi-precious stones, and high-quality plated metals.' },
  { icon: '💌', title: 'Why Choose Us', text: 'We offer fully customized jewelry, bridal sets, and gift collections with elegant packaging. Direct WhatsApp ordering for a personal experience.' },
];

const stats = [
  { val: '5+', label: 'Years of Craft' },
  { val: '10k+', label: 'Happy Customers' },
  { val: '40+', label: 'Jewelry Designs' },
  { val: '8', label: 'Collections' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="about-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{ display: 'inline-block', background: '#f5c7df', color: '#7f246f', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: '2px', marginBottom: '1.5rem' }}>
            ✦ Our Story
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#170014', lineHeight: 1.2, marginBottom: '1rem' }}>
            About <em style={{ color: '#b04a9f' }}>My Dazzling Crafts</em>
          </h1>
          <p style={{ color: '#777', maxWidth: '560px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Born from a passion for handmade beauty — crafting jewelry that shines as uniquely as the women who wear it.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ background: '#b04a9f', padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 600, color: '#fff' }}>{s.val}</div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.04em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story */}
      <section className="about-section">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center', marginBottom: '4rem' }} className="about-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, color: '#170014', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Our <em style={{ color: '#b04a9f' }}>Journey</em>
              </h2>
              <p style={{ color: '#777', lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '1rem' }}>
                My Dazzling Crafts started in a small workshop in 2019, driven by a simple belief: every woman deserves jewelry that feels personal, precious, and perfectly crafted.
              </p>
              <p style={{ color: '#777', lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '1rem' }}>
                What began as a hobby — beading and wire-wrapping late into the night — grew into a brand loved by thousands of women across India. Today we offer earrings, necklaces, bracelets, rings, bangles, and complete bridal sets.
              </p>
              <p style={{ color: '#777', lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                Every single piece is still handmade. That will never change.
              </p>
              <button
                onClick={() => navigate('/shop')}
                style={{ background: '#b04a9f', color: '#fff', border: 'none', padding: '0.7rem 1.75rem', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#7f246f'}
                onMouseLeave={e => e.currentTarget.style.background = '#b04a9f'}
              >
                Shop Our Collection →
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="about-highlight-card"
            >
              <div style={{ fontSize: '4.4rem', marginBottom: '0.75rem' }}>🌸</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#170014', marginBottom: '0.5rem' }}>
                5+ Years of Craftsmanship
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#aaa', marginBottom: '1.5rem' }}>
                Serving over 10,000 happy customers across India
              </p>
              <div style={{ textAlign: 'left' }}>
                {['Handpicked premium materials only', 'Artisan-crafted, not machine-made', 'Customization always available', 'Packaging as beautiful as the jewelry', 'WhatsApp-first personal shopping'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#777', marginBottom: '0.6rem' }}>
                    <span style={{ color: '#b04a9f' }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Values grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: '#fff', border: '1px solid #e7b9d4', borderRadius: '8px', padding: '1.75rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.5rem', color: '#170014' }}>{v.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.7 }}>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-hero {
          background: rgb(245, 199, 223);
          padding: 5rem 2rem;
          textAlign: center;
        }
        .about-section {
          padding: 5rem 2rem;
        }
        .about-highlight-card {
          background: #f8d7e8;
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
          border: 1px solid #e7b9d4;
        }
        
        @media (max-width: 768px) {
          .about-hero {
            padding: 3rem 1.25rem !important;
          }
          .about-section {
            padding: 3rem 1.25rem !important;
          }
          .about-highlight-card {
            padding: 1.75rem !important;
          }
          .about-grid {
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
