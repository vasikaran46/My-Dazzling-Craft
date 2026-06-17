import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import { categories, testimonials } from '../data/categories';
import { useStore } from '../hooks/useStore';
import subHeroImage from '../../assets/fly/sub hero/bujii.jpg';
import pinkWhyChooseUsImage from '../../assets/dark/WhatsApp Image 2026-06-16 at 4.18.31 PM.jpeg';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useStore();
  const bridalProducts = products.filter(p => p.category === 'Bridal Collections').slice(0, 4);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="home-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle title="Shop by" highlight="Collection" />
          <p style={{ textAlign: 'center', color: '#777', fontSize: '0.9rem', marginBottom: '3rem', lineHeight: 1.7 }}>
            Discover our curated jewelry collections — each crafted to perfection
          </p>
          <div className="collections-grid no-scrollbar">
            {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <motion.section
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.3, ease: 'easeOut' }}
        className="home-section"
        style={{ background: 'rgb(255, 228, 236)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle title="Our" highlight="Bridal Collection" />
          <p style={{ textAlign: 'center', color: '#777', fontSize: '0.9rem', marginBottom: '3rem', lineHeight: 1.7 }}>
            Handcrafted jewelry designed for your special day — elegant, timeless, and radiant
          </p>
          <div className="product-grid">
            {bridalProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => navigate('/shop?category=Bridal%20Collections')}
              style={{
                background: '#b04a9f', color: '#fff', border: 'none',
                padding: '0.75rem 2rem', borderRadius: '2px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
                fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#7f246f'}
              onMouseLeave={e => e.currentTarget.style.background = '#b04a9f'}
            >
              View Bridal Collection →
            </button>
          </div>
        </div>
      </motion.section>

      {/* About Brand */}
      <section className="home-section">
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem', alignItems: 'center',
        }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-block', background: '#f5c7df', color: '#7f246f', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: '2px', marginBottom: '1.5rem' }}>
              ✦ Our Story
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, color: '#170014', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Every Piece Is a <em style={{ color: '#b04a9f' }}>Labor of Love</em>
            </h2>
            <p style={{ color: '#777', lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '1rem' }}>
              My Dazzling Crafts was born from a deep passion for handmade artistry. Each piece in our collection is lovingly crafted by hand, using premium materials — from freshwater pearls to 925 sterling silver.
            </p>
            <p style={{ color: '#777', lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '1.75rem' }}>
              We believe every woman deserves jewelry that feels as unique as she is. Whether it's a bridal set or a simple everyday bracelet, we pour our heart into every creation.
            </p>
            <button
              onClick={() => navigate('/about')}
              style={{
                background: '#b04a9f', color: '#fff', border: 'none',
                padding: '0.7rem 1.75rem', borderRadius: '2px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem',
                fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#7f246f'}
              onMouseLeave={e => e.currentTarget.style.background = '#b04a9f'}
            >
              Our Full Story →
            </button>
          </motion.div>

          <motion.div
            className="why-choose-card"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{
              position: 'relative',
              backgroundImage: `url(${pinkWhyChooseUsImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 24px 60px rgba(90, 38, 92, 0.08)',
              minHeight: '380px',
            }}
          >
            <div style={{ padding: '2rem 1.5rem 1rem', position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: '#170014', marginBottom: '1.25rem', textAlign: 'center' }}>Why Choose Us?</h3>
            {[
              '100% handmade premium materials',
              'Custom personalized jewelry',
              'Direct WhatsApp ordering',
              'Elegant gift-ready packaging',
              'Bridal collections available',
              '10,000+ satisfied customers',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.88rem', color: '#777', marginBottom: '0.65rem' }}>
                <span style={{ color: '#b04a9f', fontSize: '1rem', flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section" style={{ background: 'rgb(245, 199, 223)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle title="What Our" highlight="Customers Say" />
          <p style={{ textAlign: 'center', color: '#777', fontSize: '0.9rem', marginBottom: '3rem' }}>
            Real reviews from our beautiful community
          </p>
          <Testimonials reviews={testimonials} />
        </div>
      </section>

      <style>{`
        .home-section {
          padding: 5rem 2rem;
        }
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .home-section {
            padding: 3rem 1.25rem !important;
          }
        }
        @media (max-width: 640px) {
          .collections-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            padding: 0.5rem 0.25rem !important;
            gap: 0.85rem !important;
          }
          .collections-grid > * {
            flex: 0 0 145px !important;
            scroll-snap-align: start !important;
          }
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>

    </>
  );
}

function SectionTitle({ title, highlight }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: '#170014' }}>
        {title} <em style={{ color: '#b04a9f', fontStyle: 'italic' }}>{highlight}</em>
      </h2>
    </div>
  );
}
